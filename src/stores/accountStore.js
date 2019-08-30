import { action, observable } from "mobx";
import Requests from "../Requests"

export class AccountAPI {

    getCurrentUser(){
        return Requests.authenticatedRequest("/participant/current","GET");
    }

}

export class AccountStore {

    @observable currentUserAccount = {};

    //Takes in a data strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }


    @action
    updateCurrentUserInformation = () => {
        this.strategy.getCurrentUser().then( json =>{
            this.currentUserAccount = json;
        })
    }
}