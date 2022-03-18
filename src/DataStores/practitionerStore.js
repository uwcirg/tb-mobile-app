import { action, observable, computed } from "mobx";
import { UserStore } from './userStore'
import { DateTime } from "luxon";
import {daysSinceISODateTime} from "../Utility/TimeUtils";

const ROUTES = {
    addPatient: ["/patients", "POST"],
    getCurrentPractitioner: ["/practitioner/me", "GET"],
    getOrganizations: ["/organizations", "GET"],
    getPatients: ["/v2/patients", "GET"],
    getArchivedPatients: ["/v2/patients?archived=true", "GET"],
    getPendingPatients: ["/practitioner/temporary_patients", "GET"],
    getPatientPhotos: ["/patients/photo_reports", "GET"],
    getProcessedPatientPhotos: ["/patients/photo_reports/processed", "GET"],
    getPatientNames: ["/practitioner/patients?namesOnly=true", "GET"],
    getSeverePatients: ["/patients/severe", "GET"],
    getMissingPatients: ["/patients/missed", "GET"],
    getRecentReports: ["/patients/reports/recent", "GET"],
    getCompletedResolutionsSummary: ["/practitioner/resolutions/summary", "GET"],
    getSupportRequests: ["/patients/need_support", "GET"],
    getMissingPhotos: ["/patients/missed-photo", "GET"]
}

export class PractitionerStore extends UserStore {

    //Takes in a data fetching strategy, so you can swap out the API one for testing data
    constructor(strategy) {
        super(strategy, ROUTES, "Practitioner")
    }

    @observable resolutionSummary = {
        dailyCount: 0,
        takenMedication: 0,
        notTakenMedication: 0
    }

    @observable cohortSummary = {
        loading: true,
        data: {
            symptoms: {}
        }
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
            treatmentStart: DateTime.local().toISO(),
            isTester: false
        },
        loading: false,
        code: "",
        errorReturned: false,
        errors: {
            givenName: undefined,
            familyname: undefined,
            phoneNumber: undefined
        }
    }

    @observable organizationsList = [];

    @observable patients = {};
    @observable archivedPatients = [];
    @observable patientsLoaded = false;
    @observable pendingPatients = [];

    //Currently viewed patient
    @observable selectedPatient = {
        reports: {},
        reportsLoading: false,
        details: {},
        symptomSummary: {},
        notes: []
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
        photo: [],
        support: [],
        missedPhoto: []
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

    @computed get fullName() {
        return (`${this.givenName} ${this.familyName}`)
    }

    @computed get patientList() {
        return Object.values(this.patients).map( patient => {
            return {...patient, daysSinceLastReport: patient.lastReport ? 
                (Math.round(daysSinceISODateTime(patient.lastReport.createdAt))) : 
                false}})
    }

    getPatient = (id) => {
        return this.patients[id]
    }

    getPatientName = (id) => {
        return this.patients[id] ? this.patients[id].fullName : ""
    }

    @action addNewPatient = () => {
        this.newPatient.loading = true;

        this.executeRequest('addPatient', this.newPatient.params, { allowErrors: true }).then(json => {
            this.newPatient.loading = false;

            if (json && json.error == 422) {
                this.newPatient.errors = json.paramErrors;
                this.newPatient.errorReturned = true;
            }

            if (json && json.code) {
                this.newPatient.code = json.code;
                this.getPendingPatients();
            }
        })
    }

    @action
    initalize() {
        this.userType = "Practitioner"
        this.getPatients();
        super.initalize();
    }

    @action
    logout = () => {
        this.clearLocalStorage();
        this.isLoggedIn = false;

    }

    @action getPatients = () => {
        this.executeRequest('getPatients').then(response => {
            let patientHash = {}

            response.forEach( patient => {
                patientHash[patient.id] = patient
            })

            this.patients = patientHash;
            this.patientsLoaded = true;
        })
        this.getPendingPatients();
    }

    @action getPendingPatients = () => {
        this.executeRequest('getPendingPatients').then(response => {
            this.pendingPatients = response;
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

    @action processPhoto = (id, body) => {
        return this.executeRawRequest(`/v2/photo_reports/${id}`, "PATCH", body).then( res => {
            this.adjustIndex();
            this.getPhotoReports();
        })
    }

    @action resetActivationCode = (id) => {
        this.executeRawRequest(`/patient/${id}/password-reset`, "POST").then(response => {
            this.newActivationCode = response.temporaryPassword;
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

    resolveMissedPhoto(patientId, kind) {
        this.executeRawRequest(`/v2/resolutions`, "POST", { patientId: patientId, kind: "MissedPhoto", resolvedAt: DateTime.local().toISO() }).then(response => {
            this.adjustIndex();
            this.getMissingPhotos();
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

    @action clearNewPatient = () => {
        this.newPatient.code = "";
        this.newPatient.errorReturned = false;
        this.newPatient.errors = {
            givenName: undefined,
            familyname: undefined,
            phoneNumber: undefined
        },
            this.newPatient.params = {
                givenName: "",
                familyName: "",
                phoneNumber: "",
                treatmentStart: new Date().toISOString(),
                isTester: false
            }
    }

    @action setCohortSummary = (response) => {
        this.cohortSummary.loading = false;
        this.cohortSummary.data = response;
    }

    @action setResolutionsSummary = (response) => {
        this.resolutionSummary.dailyCount = response.count;
        this.resolutionSummary.takenMedication = response.medicationReporting.true
        this.resolutionSummary.notTakenMedication = response.medicationReporting.false
    }

    @computed get totalTasks() {
        let total = 0
        Object.keys(this.filteredPatients).forEach((each) => {
            total += this.filteredPatients[each].length
        })
        return total
    }

    @action setPatientNotes(notes) {
        this.selectedPatient.notes = notes;
    }

    @action setMissingPhotos(patients) {
        const values = Object.keys(patients).map(key => { return { patientId: key, lastDate: patients[key][0].date, numberOfDays: patients[key].length, data: patients[key] } });
        this.filteredPatients.missedPhoto = values;
    }

    getCohortSummary = () => {
        this.executeRawRequest(`/organizations/${this.organizationID}/cohort_summary`).then(response => {
            this.setCohortSummary(response);
        })
    }

    getCompletedResolutionsSummary = () => {
        this.executeRequest("getCompletedResolutionsSummary").then(response => {
            this.setResolutionsSummary(response)
        })
    }

    getMissingPhotos = () => {
        this.executeRequest("getMissingPhotos").then(response => {
            if (response) {
                this.setMissingPhotos(response)
            }

        })
    }

    getSupportRequests = () => {
        this.executeRequest("getSupportRequests").then(response => {
            this.filteredPatients.support = response.map(each => { return { patientId: each } })
        })
    }

    resolveSupportRequest = () => {
        this.executeRawRequest(`/patient/${this.selectedPatientID}/resolutions?type=support`, "POST").then(response => {
            this.adjustIndex();
            this.getSupportRequests();
        })
    }

    @computed get numberOfCompletedTasks() {
        return this.resolutionSummary.dailyCount || 0;
    }

    @computed get totalReported() {
        return (this.resolutionSummary.takenMedication || 0) + (this.resolutionSummary.notTakenMedication || 0)
    }

    // Creates a hash { patientID: total num issues}
    // @todo if the new dashboard gets adopted it would be good to do this on the serverside
    @computed get issuesPerPatient() {
        let issues = {}
        Object.values(this.filteredPatients).forEach(each => {
            each.map(value => {
                if (!value.url) { //Exclude photo requests ( not an "issue")
                    const key = `${value.patientId}`
                    issues[key] ? issues[key] += 1 : issues[key] = 1
                }
            })
        })
        return issues;
    }

    // Test Stuff for new sorted dashboard - need to move to a different store for better organization 
    // Can flip value to 1 or -1 to sort
    @observable sortOptions = {
        type: "",
        direction: 0
    }

    @observable filterOptions = {
        type: "",
        direction: 0,
        query: ""
    }

    @computed get sortedPatientList() {

        //Apply searches, filters, and sorting to list of patients
        return Object.values(this.patients).sort((a, b) => {
            if (this.sortOptions.type === "issues") {
                return this.sortOptions.direction * ((this.issuesPerPatient[`${a.id}`] || 0) - (this.issuesPerPatient[`${b.id}`] || 0))
            }

            return this.sortOptions.direction * (a[`${this.sortOptions.type}`] - b[`${this.sortOptions.type}`])
        }).filter((item) => {
            return this.filterOptions.query == "" || item.fullName.toLowerCase().includes(this.filterOptions.query.toLowerCase())
        })
    }

    @action setFilterQuery = (query) => {
        this.filterOptions.query = query
    }

    @action toggleSort = (type) => {

        if (this.sortOptions.type !== type) {
            this.sortOptions.type = type
            this.sortOptions.direction = -1
            return
        }

        this.sortOptions.direction === -1 ? this.sortOptions.direction = 1 : this.sortOptions.direction -= 1;
    }

    @computed get cohortAverageAdherence(){
        const patientList = Object.values(this.patients);
        if(patientList.length === 0) return 0
        return ((patientList.reduce( (previousValue, currentValue) => {
            return previousValue + currentValue.adherence
        }, 0) / patientList.length).toFixed(2))
    }

    @computed get cohortAveragePhotoAdherence(){
        const patientList = Object.values(this.patients);
        if(patientList.length === 0) return 0
        return ((patientList.reduce( (previousValue, currentValue) => {
            return previousValue + currentValue.photoAdherence
        }, 0) / patientList.length).toFixed(2))
    }

    @action setArchivedPatients = (list) => {
        this.archivedPatients = list;
    }

    getArchivedPatients = () => {
        this.executeRequest("getArchivedPatients").then(response => {
            this.setArchivedPatients(response)
        })
    }

}
