import { action, observable, computed } from "mobx";
import { UserStore } from './userStore'

const ROUTES = {
    addPatient: ["/patient", "POST"],
    getCurrentPractitioner: ["/practitioner/me", "GET"],
    getOrganizations: ["/organizations", "GET"],
    getPatients: ["/practitioner/patients", "GET"],
    getTemporaryPatients: ["/practitioner/temporary_patients", "GET"],
    getPatientPhotos: ["/patients/photo_reports", "GET"],
    getProcessedPatientPhotos: ["/patients/photo_reports/processed", "GET"],
    getPatientNames: ["/practitioner/patients?namesOnly=true", "GET"],
    getSeverePatients: ["/patients/severe", "GET"],
    getMissingPatients: ["/patients/missed", "GET"],
    getRecentReports: ["/patients/reports/recent", "GET"]
}

export class PractitionerStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Practitioner")
    }

    @observable selectedPatientSymptoms = {
        summary: [],
        summaryLoading: false,
        numberResolved: 0
    }

    //Test
    @observable recentReports = []

    DEFAULT_PHONE = 5412345678;

    @observable onNewPatientFlow = false;

    @observable newPatient = {
        params: {
            givenName: "",
            familyName: "",
            phoneNumber: "",
            startDate: new Date().toISOString()
        },
        loading: false,
        code: "",
        errorReturned: false,
        errors: {
            givenName: undefined,
            familyname: undefined,
            phoneNumber: undefined
        },
        clear:  function() {
            this.code ="";
            this.errorReturned= false;
            this.errors= {
                givenName: undefined,
                familyname: undefined,
                phoneNumber: undefined
            }
        }
    }

    @observable organizationsList = [];

    @observable patients = [];
    @observable temporaryPatients = [];

    //Currently viewed patient
    @observable selectedPatient = {
        reports: []
    }

    @observable missedDays = {
        days: [],
        loading: false,
        lastResolution: {},
        clearSelection: function () {
            this.days = []
            this.loading = false
            this.lastResolution = {}
        }
    }

    @observable filteredPatients = {
        symptom: [],
        missed: [],
        photo: []
    }

    @observable selectedRow = {
        type: "",
        index: -1,
        clearSelection: function () {
            this.index = -1,
                this.type = ""
        }
    }

    @observable onAddPatientFlow = false;

    @observable newActivationCode = "";

    @computed get patientList() {
        return Object.values(this.patients)
    }

    getPatient = (id) => {
        return this.patients[id]
    }

    getPatientName = (id) => {
        return this.patients[id] ? this.patients[id].fullName : "Patient Name"
    }

    @action addNewPatient = () => {
        this.newPatient.loading = true;

        this.executeRequest('addPatient', this.newPatient.params, { allowErrors: true }).then(json => {
            this.newPatient.loading = false;

            if (json.error == 422) {
                this.newPatient.errors = json.paramErrors;
                this.newPatient.errorReturned = true;
            }

            if (json.code) {
                this.newPatient.code = json.code;
            }
        })
    }

    @action
    initalize() {
        this.userType = "Practitioner"
        this.getOrganizations();
        this.getPatients();
        super.initalize();
    }

    @action
    getOrganizations = () => {
        this.executeRequest('getOrganizations').then(json => {

            let list = []
            json.length > 0 && (json.map(each => {
                return (each.title)
            }))

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

    @action getPhotoReports = () => {
        this.executeRequest("getPatientPhotos").then(response => {
            this.filteredPatients.photo = response;
        })
    }

    @action getProcessedPhotoReports = () => {
        this.executeRequest("getProcessedPatientPhotos").then(response => {
            this.filteredPatients.photo = response;
        })
    }

    @action getPatientDetails = (id) => {
        this.executeRawRequest(`/practitioner/patient/${id}?`, "GET").then(response => {
            this.selectedPatient = response
        })

        //Must fetch reports seperately due to key tranform in Rails::AMS removing dashes ISO date keys :(
        this.executeRawRequest(`/patient/${id}/reports`, "GET").then(response => {
            this.selectedPatient.reports = response;
        })
    }

    @action getSeverePatients = () => {
        return this.executeRequest("getSeverePatients").then(response => {
            this.filteredPatients.symptom = response;
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
            this.adjustIndex();
            this.getPhotoReports();
        })
    }

    @action resetActivationCode = (id) => {
        this.executeRawRequest(`/patient/${id}/activation_code`, "PATCH").then(response => {
            this.newActivationCode = response.newCode;
        })
    }

    @action getRecentReports = () => {
        this.executeRequest("getRecentReports").then(response => {
            this.recentReports = response;
        })
    }

    @action getSelectedPatientSymptoms = () => {
        if (this.selectedRow.index >= 0) {
            this.selectedPatientSymptoms.loading = true;
            this.executeRawRequest(`/patient/${this.selectedPatientID}/symptoms`, "GET").then(response => {
                this.selectedPatientSymptoms.summary = response
                this.selectedPatientSymptoms.loading = false;
                this.selectedPatientSymptoms.numberResolved += 1;
            })
        }
    }

    @action resolveSymptoms() {
        this.executeRawRequest(`/patient/${this.selectedPatientID}/resolutions?type=symptom`, "POST").then(response => {
            this.adjustIndex();
            this.getSeverePatients().then(() => {
                this.getSelectedPatientSymptoms();
            })
        })
    }

    @action getPatientMissedDays() {
        this.missedDays.loading = true;
        this.executeRawRequest(`/patient/${this.selectedPatientID}/missed_reports`, "GET").then(response => {
            this.missedDays.loading = false;
            this.missedDays.days = response.days;
            this.missedDays.lastResolution = response.last_resolved;
        })
    }

    @action adjustIndex() {
        if (this.selectedRow.index > this.filteredPatients[this.selectedRow.type].length - 2) {
            this.selectedRow.index -= 1;
        }

        if (this.filteredPatients[this.selectedRow.type].length === 1) {
            this.selectedRow.clearSelection();
        }
    }

    resolveMedication() {
        this.executeRawRequest(`/patient/${this.selectedPatientID}/resolutions?type=medication`, "POST").then(response => {
            this.adjustIndex();
            this.getMissingPatients();
        })
    }

    @computed get getSelectedPatient() {

        if (this.selectedRow.patientId < 0) {
            return {}
        }

        return this.patients[`${this.filteredPatients[this.selectedRow.type][this.selectedRow.index].patientId}`];

    }

    @computed get selectedPatientID() {
        return this.getSelectedPatient.id
    }

    resetPassword = () => {
        this.resetActivationCode(this.selectedPatient.id);
    }


}