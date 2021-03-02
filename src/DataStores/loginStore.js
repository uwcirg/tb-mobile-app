import { action, observable, computed } from "mobx";
import APIStore from './apiStore';

const ROUTES = {
    login: ["/auth", "POST"],
    checkActivationCode: ["/patient/activation/check","POST"],
    activatePatient: ["/patient/activation","POST"]
}

const ADMIN = "Administrator"
const PATIENT = "Patient"
const PRACTITIONER = "Practitioner"

export default class LoginStore extends APIStore {

    constructor(strategy) {
        super(strategy, ROUTES);
        this.userType = localStorage.getItem("user.type");
    }

    @observable selectedUserType = "";
    @observable userType = "";
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

    @computed get isPatient(){
        return this.selectedUserType === PATIENT
    }

    @computed get isLoggedIn(){
        return this.userType !== "";
    }

    @action submit = () => {

        let body = {
            password: this.password,
        }

        if(this.selectedUserType === "Patient"){
            body.phoneNumber = this.identifier
        }else{
            body.email = this.identifier
        }

        return this.executeRequest('login', body).then(response => {

            if(response.status > 400){
                this.error = response.status;
                return
            }
            
            this.userType = this.handleAuthentication(response);
        })
    }

    @action clearError = () => {
       this.error = "";
   }

    persistUserData = (json) => {
        localStorage.setItem("user.type", json.user_type);
    }

    @action handleAuthentication = (json) => {
        if (json && json.user_id) {
            this.persistUserData(json);
            return json.user_type
        }
        return false;
    }

    @action logout = () =>{
        console.log("loginStore logout")
        this.userType = ""
        localStorage.removeItem("user.type")
        localStorage.removeItem("cachedProfile")
    }

}