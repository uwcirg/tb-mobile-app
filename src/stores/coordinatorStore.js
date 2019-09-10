import { action, observable,toJS} from "mobx";

export class CoordinatorStore {


    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @observable newPassword = "";

    @action resetUserPassword = (participantID) => {
        return this.strategy.executeRawRequest(`/participant/${participantID}/reset_password`,"PATCH")
    }

    

   
}