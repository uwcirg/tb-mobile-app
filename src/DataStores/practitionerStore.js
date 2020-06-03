import { action, observable, computed } from "mobx";
import { UserStore } from './userStore'

const ROUTES = {
    addPatient: ["/patient", "POST"],
    getCurrentPractitioner: ["/practitioner/me", "GET"],
    getOrganizations: ["/organizations", "GET"],
    notifyAll: ["/notify_all", "POST"],
    getPatients: ["/practitioner/patients", "GET"],
    getTemporaryPatients: ["/practitioner/temporary_patients", "GET"],
    getPatientPhotos: ["/patients/photo_reports", "GET"],
    getProcessedPatientPhotos: ["/patients/photo_reports/processed", "GET"],
    getPatientNames: ["/practitioner/patients?namesOnly=true", "GET"],
    getSeverePatients: ["/patients/severe", "GET"],
    getMissingPatients: ["/patients/missed", "GET"],
    getPatientsTest: ["/test/patients", "GET"]
}

export class PractitionerStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Practitioner")
    }

    @observable testPatients = []

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

    @observable patientNames = {};
    @observable patients = [];
    @observable temporaryPatients = [];
    @observable photoReports = [];
    @observable processedPhotoReports = [];

    //Currently viewed patient
    @observable selectedPatient = {
        reports: []
    }

    @observable filteredPatients = {
        symptoms: [],
        missed: []
    }

    @observable selectedRow = {
        visible: false,
        type: "",
        id: -1,
        patientId: -1,
        clearSelection: function () {
            this.id = -1,
                this.type = "",
                this.visible = false
        }
    }

    getPatient = (id) => {
        return this.patients.find(patient => { return patient.id == id })
    }

    @action
    addNewPatient = () => {
        this.newPatientLoading = true;

        return this.executeRequest('addPatient', this.newPatientInformation).then(json => {
            this.newPatientLoading = false;

            if (json.error === 422) {
                this.paramErrors = json.paramErrors;
                this.errorReturned = true;
            }

            if (json.code) {
                this.newPatientCode = json.code;
            }
        });
    }

    @action
    initalize() {
        this.userType = "Practitioner"
        this.getOrganizations();
        this.getPatients();
        this.getPatientNames();
        super.initalize();
    }

    @action
    getOrganizations = () => {
        this.executeRequest('getOrganizations').then(json => {
            let list = json.map(each => {
                return (each.title)
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

    @action getPatients = () => {
        this.executeRequest('getPatients').then(response => {
            this.patients = response;
        })

        this.executeRequest('getTemporaryPatients').then(response => {
            this.temporaryPatients = response;
        })
    }

    sendNotificationToAll = () => {
        this.executeRequest("notifyAll").then(response => {
            console.log(response)
        })
    }

    @action getPhotoReports = () => {
        this.executeRequest("getPatientPhotos").then(response => {
            this.photoReports = response;
        })
    }

    @action getProcessedPhotoReports = () => {
        this.executeRequest("getProcessedPatientPhotos").then(response => {
            this.processedPhotoReports = response;
        })
    }

    @action getPatientDailyReports = (id) => {
        this.executeRawRequest(`/patient/${id}/reports`, "GET").then(response => {
            this.selectedPatient.reports = response;
        })
    }

    @action getPatientNames = () => {
        this.executeRequest("getPatientNames").then(response => {
            this.patientNames = response;
        })
    }

    @action getSeverePatients = () => {
        this.executeRequest("getSeverePatients").then(response => {
            this.filteredPatients.symptoms = response;
        })
    }

    @action getMissingPatients = () => {
        this.executeRequest("getMissingPatients").then(response => {
            this.filteredPatients.missed = response;
        })
    }

    @action processPhoto = (id, approved) => {
        let body = { approved: approved }
        this.executeRawRequest(`/photo_submission/${id}`, "PATCH", body).then(response => {
            //TODO: Could update this to just remove the updated photo submission from list instead of fetching again
            this.getPhotoReports();
            if( this.photoReports.length > 0){
                this.selectedRow.id = 0;
            }else{
                this.selectedRow.clearSelection();

            }
        })
    }

    @action getPatientsTest = () => {
        this.executeRequest("getPatientsTest").then(response => {
            this.testPatients = response;
        })
    }

    @computed get selectedPatientInfo() {

        if (this.selectedRow.patientId < 0) {
            return {}
        }

        let result = this.patients.find(each => {
                return each.id === this.selectedRow.patientId

        })

        console.log("Result is: " + result)

        return (result)
    }


}