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

    @observable onboardingInformation = {
       gender: "",
       age: 0,
       enableNotifications: false,
       notificationTime: DateTime.local().toISOTime()
    }
    

    @action register(body) {
        return this.executeRequest('register', body).then(json => {
            this.setAccountInformation(json);
        });
    }


}
