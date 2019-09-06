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

    @observable currentPassword = "";

    @observable passwordUpdate = {
        one: "",
        two: ""
    }

    @observable accountUpdateAttempt = false;
    @observable accountUpdateSuccess = false;


    @observable passwordUpdateAttempt = false;
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
        this.accountUpdateAttempt = true;

        return this.strategy.executeRequest(ROUTES,'updateCurrentUser',toJS(this.userInput)).then( json =>{
            this.currentUser = json;
            this.accountUpdateSuccess = true;
        }).catch(err =>{
            this.accountUpdateSuccess = false;
        })
    }

    @action validateAndUpdatePassword = () => {

        this.passwordUpdateAttempt = true;
        if(this.passwordUpdate.one === this.passwordUpdate.two){
            let body = {
                current_password: this.currentPassword,
                password: this.passwordUpdate.one,
                password_check: this.passwordUpdate.two
            }

            this.strategy.executeRequest(ROUTES,'updatePassword',body).then( res => {
                this.passwordUpdateSuccess = true;
            }).catch((err) =>{
                console.log(err);
                this.passwordUpdateSuccess = false;
            })


        }else{
            this.afterPasswordUpdateText = "Passwords do not match"
            this.passwordUpdateSuccess = false;
            return new Error("Passwords do not match");
        }

        
    }
}