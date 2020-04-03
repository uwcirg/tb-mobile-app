import { action, observable } from "mobx";
import APIStore from './apiStore';

const ROUTES = {
    login: ["/auth", "POST"],
    checkActivationCode: ["/patient/activation/check","POST"],
    activatePatient: ["/patient/activation","POST"],
}

export default class LoginStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);
    }

    @observable error = 0;

    @observable identifier = "";
    @observable password = "";

    //Patient Activation
    @observable activationWasRequested = false;
    @observable activationWasSuccessful = false;
    @observable activationLoading = false;

    activationBody = {
        phoneNumber: "",
        activationCode: "",
        username: "",
        password: "",
        passwordConfirmation: ""
    }
    
    @action verifyActivationCode = () => {
        this.executeRequest('checkActivationCode',this.activationBody).then(json =>{
            this.activationWasRequested = true;
            this.activationWasSuccessful = json.validCode;
        })
    }

    login = (userType) => {

        let body = {
            identifier: this.identifier,
            password: this.password,
            userType: userType
        }

        return this.executeRequest('login', body).then(response => {

            if(response instanceof Error){
                this.error = response.message;
                return
            }
            
            return this.handleAuthentication(response);
        })
    }

   activatePatient = () => {
       return this.executeRequest('activatePatient',this.activationBody).then(json =>{
           return this.handleAuthentication
       })
   }

    @action clearError = () => {
       this.error = "";
   }

    persistUserData = (json) => {
        localStorage.setItem("user.token", json.token);
        localStorage.setItem("user.type", json.user_type);
        localStorage.setItem(`userID`, json.user_id);
        localStorage.setItem("token.exp", json.exp);
    }

    handleAuthentication = (json) => {
        if (json && json.user_id) {
            this.persistUserData(json);
            return json.user_type
        }
        return false;
    }

}