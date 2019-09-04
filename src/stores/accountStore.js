import { action, observable,toJS} from "mobx";


const ROUTES = {
    getCurrentUser: ["/participant/current","GET"],
    updateCurrentUser: ["/participant/current","PATCH"],
    updatePassword: ["/participant/current/password","PATCH"]
}

export class AccountStore {

    @observable currentUser = {};

    @observable userInput = {
        name: "",
        phone_number: "",
        treatment_start: ""
    }

    @observable passwordUpdate = {
        one: "",
        two: ""
    }

    @observable afterPasswordUpdateText = ""
    @observable passwordUpdateSuccess = false;


    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        this.strategy = strategy;
    }

    @action
    getCurrentUserInformation = () => {
        this.strategy.executeRequest(ROUTES,'getCurrentUser').then( json =>{
            this.currentUser = json;
        })
    }

    @action updateCurrentUserInformation = () => {
        this.strategy.executeRequest(ROUTES,'updateCurrentUser',toJS(this.userInput)).then( json =>{
            this.currentUser = json;
        })
    }

    @action validateAndUpdatePassword = () => {

        if(this.passwordUpdate.one === this.passwordUpdate.two){
            let body = {
                password: this.passwordUpdate.one,
                password_check: this.passwordUpdate.two
            }

            this.passowrdUpdateAttempted = true;
            this.strategy.executeRequest(ROUTES,'updatePassword',body).then( res => {
                this.afterPasswordUpdateText = "Password Update Success"
                this.passwordUpdateSuccess = true;
            }).catch( err => {
                this.afterPasswordUpdateText = "Password Update Failed on Server"
                return new Error("Error updating password on server");
            })


        }else{
            this.afterPasswordUpdateText = "Passwords do not match"
            return new Error("Passwords do not match");
        }

        
    }
}