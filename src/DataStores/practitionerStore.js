import { action, observable} from "mobx";
import {UserStore} from './userStore'

const ROUTES = {
    login: ["/auth/login/coordinator","POST"],
    post_resolution: ["/resolution","POST"],
    get_records: ["/participant/all", "GET"],
    get_coordinator: ["/coordinator/current", "GET"],
    set_photo_status:["/photo"],
    add_coordinator:["/coordinator", "POST"],
    addPatient:["/patient","POST"],
    getCurrentPractitioner:["/practitioner/me", "GET"],
    getOrganizations:["/organizations","GET"],
    notifyAll: ["/notify_all", "POST"]
}

export class PractitionerStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy,ROUTES,"Practitioner")
    }

    DEFAULT_PHONE = 5412345678;

    @observable onNewPatientFlow = false;
    @observable newPatientLoading = false;
    @observable newPatientCode = "";
    @observable errorReturned = false;

    @observable organizationsList = [];

    @observable paramErrors = {
        givenName: undefined,
        familyname: undefined,
        phoneNumber: undefined
    };

    @observable newPatientInformation = {
        givenName: "",
        familyName: "",
        phoneNumber: "",
        organization: "",
        startDate: new Date().toISOString()
    }

    @action
    addNewPatient = () => {
        this.newPatientLoading = true;

        return this.executeRequest('addPatient',this.newPatientInformation).then(json => {
            console.log(json)
            this.newPatientLoading = false;

            if(json.error === 422){
                this.paramErrors = json.paramErrors;
                this.errorReturned = true;
            }

            if(json.code){
                this.newPatientCode = json.code;
            }
        });
    }

    @action
    initalize(){
        this.getOrganizations();
        super.initalize();
    }

    @action
    getOrganizations = () => {
        this.executeRequest('getOrganizations').then( json => {
            let list = json.map(each =>{
                return(each.title)
            })
            this.organizationsList = list
            list.length > 0 && (this.newPatientInformation.organization = list[0]);
        })
    }

    @action
    logout = () => {
        this.clearLocalStorage();
        this.isLoggedIn = false;

    }

    @action
    setAccountInformation = () => {
        console.log("pracition set account info")
    }

    sendNotificationToAll = () => {
        this.executeRequest("notifyAll").then( response => {
            console.log(response)
        })
    }


}