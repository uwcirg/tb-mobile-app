import { action, observable, computed} from "mobx";
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
    notifyAll: ["/notify_all", "POST"],
    getPatients: ["/practitioner/patients","GET"],
    getTemporaryPatients: ["/practitioner/temporary_patients","GET"],
    getPatientPhotos: ["/patients/photo_reports","GET"],
    getProcessedPatientPhotos: ["/patients/photo_reports/processed","GET"]
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

    @observable patients = [];
    @observable temporaryPatients = [];
    @observable photoReports = [];
    @observable processedPhotoReports = [];

    //Currently viewed patient
    @observable selectedPatient = {
        reports: []
    }

    getPatient = (id) => {
        return this.patients.find(patient => { return patient.id == id})
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
        this.getPatients();
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


    @action getPatients = () => {
        this.executeRequest('getPatients').then( response => {
            this.patients = response;
        })

        this.executeRequest('getTemporaryPatients').then(response => {
            this.temporaryPatients = response;
        })
    }

    sendNotificationToAll = () => {
        this.executeRequest("notifyAll").then( response => {
            console.log(response)
        })
    }

    @action getPhotoReports = () => {
        this.executeRequest("getPatientPhotos").then( response => {
            this.photoReports = response;
        })
    }

    @action getProcessedPhotoReports = () => {
        this.executeRequest("getProcessedPatientPhotos").then( response => {
            this.processedPhotoReports = response;
        })
    }

    @action getPatientDailyReports = (id) => {
        this.executeRawRequest(`/patient/${id}/reports`,"GET").then(response => {
            this.selectedPatient.reports = response;
        })
    }

    approvePhoto = (id) => {
        let body = {approved: true}
        this.executeRawRequest(`/photo_submission/${id}`,"PATCH").then(response => {
            console.log(response);
        })
    }


}