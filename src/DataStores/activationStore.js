import { action, observable, computed} from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    activate: ["/v2/patient/self/activation", "POST"],
    setPassword: ["/patient/self/password", "POST"]
}

export class ActivationStore extends APIStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable isLoading = false;

    @observable onboardingInformation = {
        gender: "Woman",
        age: 30,
        enableNotifications: false,
        notificationTime: DateTime.local().toISOTime(),
        date: DateTime.local().toISODate(),
        numberOfContacts: 0,
        contactsTested: "Yes",
        genderOther: ""
    }

    @observable activationError = false;
    @observable activtionErrorDetail = "";
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

    @action submitActivation = () => {
        this.isLoading = true;
        this.onboardingInformation.currentDate = DateTime.local().toISODate();

        return this.executeRequest('activate', this.requestBody() ,{allowErrors: true}).then(json => {
            if(json.error){
                this.activationError = true;
                this.activtionErrorDetail = json.error;
            }else{
                this.activationSuccess = true;
            }
            this.isLoading = false;
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

    @action clearActivationError = () => {
        this.activationError = false;
        this.activtionErrorDetail = "";
    }

    @action setNotificationTime = (time) => {
        this.onboardingInformation.notificationTime = time;
    }

    @computed get checkPasswords() {
        const notEmpty = (this.passwordUpdate.password != "" && this.passwordUpdate.passwordConfirmation != "")


        return (notEmpty && this.passwordsMatch)
    }

    @computed get passwordsMatch() {
        return (this.passwordUpdate.password === this.passwordUpdate.passwordConfirmation)
    }

    requestBody = () => {
        return(
            {
                date: this.onboardingInformation.currentDate,
                enableNotifications: this.onboardingInformation.enableNotifications,
                notificationTime: this.onboardingInformation.notificationTime,
                
                contactTracingSurvey: {
                    numberOfContacts: this.onboardingInformation.numberOfContacts,
                    numberOfContactsTested: 1
                },
                patient: {
                    gender: this.onboardingInformation.gender,
                    genderOther: this.onboardingInformation.genderOther,
                    age: this.onboardingInformation.age
                }
            }
        )
    }


}
