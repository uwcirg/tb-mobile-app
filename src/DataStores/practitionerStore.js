import { action, observable, computed, toJS } from "mobx";
import { UserStore } from './userStore'
import { DateTime } from "luxon";

const ROUTES = {
    addPatient: ["/patients", "POST"],
    getCurrentPractitioner: ["/practitioner/me", "GET"],
    getOrganizations: ["/organizations", "GET"],
    getPatients: ["/practitioner/patients", "GET"],
    getTemporaryPatients: ["/practitioner/temporary_patients", "GET"],
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
    @observable temporaryPatients = [];

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
        return Object.values(this.patients)
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
                this.getTemporaryPatients();
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
            this.patients = response;
        })
        this.getTemporaryPatients();
    }

    @action getTemporaryPatients = () => {
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

    resetPassword = () => {
        this.resetActivationCode(this.selectedPatient.details.id);
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
                startDate: new Date().toISOString(),
                isTester: false
            }
    }

    @action setCohortSummary = (response) => {
        this.cohortSummary.loading = false;
        this.cohortSummary.data = response;
    }

    @action setPatientSymptomSummary = (symptoms) => {
        this.selectedPatient.symptomSummary = symptoms
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

    //Get detials to fill in patient profile information
    getPatientDetails = (id) => {
        this.executeRawRequest(`/practitioner/patient/${id}`, "GET").then(response => {
            this.setSelectedPatientDetails(response);
        })
        //Must fetch reports seperately due to key tranform in Rails::AMS removing dashes ISO date keys :(
        this.executeRawRequest(`/patient/${id}/reports`, "GET").then(response => {
            this.setPatientReports(response);
        })

        this.executeRawRequest(`/patient/${id}/symptom_summary`).then(response => {
            this.setPatientSymptomSummary(response);
        })

        this.getPatientNotes(id);
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

    getPatientNotes = (patientID) => {
        return this.executeRawRequest(`/patient/${patientID || this.selectedPatient.details.id}/notes`).then(response => {
            this.setPatientNotes(response)
        })
    }

    postPatientNote = (title, note) => {
        const body = { title: title, note: note }
        this.executeRawRequest(`/patient/${this.selectedPatient.details.id}/notes`, 'POST', body).then(response => {
            this.getPatientNotes();
            return response
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


}
