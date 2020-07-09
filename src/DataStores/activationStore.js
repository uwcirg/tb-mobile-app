import { action, observable, computed, autorun, toJS } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    activate: ["/patient/self/activate", "POST"],
    setPassword: ["/patient/self/password", "POST"]
}

export class ActivationStore extends APIStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable isLoading = false;

    @observable onboardingInformation = {
        gender: "Female",
        age: 30,
        enableNotifications: false,
        notificationTime: DateTime.local().toISOTime(),
        numberOfContacts: 0,
        contactsTested: "Yes"
    }

    @observable activationError = false;
    @observable activationSuccess = false;

    @observable passwordUpdate = {
        passwordAccepted: false,
        passwordLoading: false,
        password: "",
        passwordConfirmation: ""
  
    }


    @action addToNumberOfContacts(value) {
        const temp = this.onboardingInformation.numberOfContacts + value;
        if (temp >= 0) this.onboardingInformation.numberOfContacts += value;
    }


    @action register(body) {
        return this.executeRequest('register', body).then(json => {
            this.setAccountInformation(json);
        });
    }

    @action submitActivation() {
        this.isLoading = true;
        return this.executeRequest('activate', this.onboardingInformation,{allowErrors: true}).then(json => {
            if(json.error){
                this.activationError = true;
            }
            this.isLoading = false;
            this.activationSuccess = true;
        })
    }

    @action submitPassword = () => {
        const body = {
            password: this.passwordUpdate.password,
            passwordConfirmation: this.passwordUpdate.passwordConfirmation
        }
        this.passwordUpdate.passwordLoading = true;
        this.executeRequest('setPassword',body).then((json) => {
            this.passwordUpdate.passwordLoading = false;
            this.passwordUpdate.passwordAccepted = true;
        });
    }

    @computed get checkPasswords() {
        const notEmpty = (this.passwordUpdate.password != "" && this.passwordUpdate.passwordConfirmation != "")


        return (notEmpty && this.passwordsMatch)
    }

    @computed get passwordsMatch() {
        return (this.passwordUpdate.password === this.passwordUpdate.passwordConfirmation)
    }


}
