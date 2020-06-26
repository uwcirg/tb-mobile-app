import { action, observable, computed, autorun, toJS } from "mobx";
import APIStore from './apiStore'
import { DateTime } from "luxon";

const ROUTES = {
    activate: ["/patient/self/activate", "POST"],
}

export class ActivationStore extends APIStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable isLoading = false;

    @observable onboardingInformation = {
        newPassword: "",
        newPasswordConfirmation: "",
        gender: "",
        age: 0,
        enableNotifications: false,
        notificationTime: DateTime.local().toISOTime(),
        numberOfContacts: 0

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
    }

    @computed get checkPasswords(){
        const notEmpty = (this.onboardingInformation.newPassword != "" && this.onboardingInformation.newPasswordConfirmation != "")
        const equal = (this.onboardingInformation.newPassword === this.onboardingInformation.newPasswordConfirmation)

        return (notEmpty && equal)
    }


}
