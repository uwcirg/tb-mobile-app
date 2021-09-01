import { action, observable, computed, autorun } from "mobx";
import APIHelper from '../API/Requests'

export default class PatientProfileStore {

    constructor() {
        this.apiHelper = new APIHelper();
    }

    @observable temporaryPassword = "";

    @observable onPasswordReset = false;
    @observable onChangeDetails = false;
    @observable onArchive = false;
    @observable onArchiveWarning = false;

    @observable selectedPatient = {
        symptomSummary: {},
        reports: {},
        details: {},
        notes: [],
        loaded: false,
        reportsLoaded: false,
        accessError: false
    }

    @observable changes = {
        givenName: "",
        familyName: "",
        phoneNumber: "",
        treatmentEndDate: "",
        errors: {},
        success: false
    }

    @observable treatmentOutcome = {
        appEndDate: null,
        treatmentOutcome: null
    }

    @observable reportSplice = 10;

    @action toggleOnPasswordReset = () => {
        this.onPasswordReset = !this.onPasswordReset;
    }

    @action toggleOnChangeDetails = () => {
        this.onChangeDetails = !this.onChangeDetails;
    }

    @action toggleOnArchive = () => {
        this.onArchive = !this.onArchive;
    }

    @action closeResetPassword = () => {
        this.onPasswordReset = false;
    }

    @action setGivenName = (update) => {
        this.givenName = update;
    }

    @action setFamilyName = (update) => {
        this.familyName = update;
    }

    updatePatientDetails = () => {
        this.apiHelper.executeRawRequest()
    }

    @action setSelectedPatientDetails = (details) => {
        this.selectedPatient.details = details;
        this.selectedPatient.loaded = true;

        if (this.selectedPatient.details.status === "Archived") {
            this.onArchiveWarning = true;
        }
    }

    @action setAuthError = () => {
        this.selectedPatient.accessError = true;
    }

    @action resetProfileState = () => {
        this.selectedPatient = {
            reportsLoading: false,
            symptomSummary: {},
            reports: {},
            details: {},
            notes: [],
            loaded: false,
            reportsLoaded: false,
            accessError: false
        }
        this.reportSplice = 10;
    }

    @action addPatientReports = (reports) => {
        this.selectedPatient.reports = reports;
        this.selectedPatient.reportsLoaded = true;
    }

    @action setPatientSymptomSummary = (symptoms) => {
        this.selectedPatient.symptomSummary = symptoms;
    }

    @action initalizeChanges = () => {
        this.changes.familyName = this.selectedPatient.details.familyName;
        this.changes.givenName = this.selectedPatient.details.givenName;
        this.changes.phoneNumber = this.selectedPatient.details.phoneNumber;
        this.changes.treatmentEndDate = this.selectedPatient.details.treatmentEndDate;
    }

    @computed get hasChanges() {
        return this.changes.givenName !== this.selectedPatient.details.givenName ||
            this.changes.familyName != this.selectedPatient.details.familyName ||
            this.changes.phoneNumber != this.selectedPatient.details.phoneNumber ||
            this.changes.treatmentEndDate != this.selectedPatient.details.treatmentEndDate
    }

    @computed get hasErrorWithChanges() {
        return Object.keys(this.changes.errors).length > 0
    }

    //Get detials to fill in patient profile information
    getPatientDetails = (id) => {
        this.resetProfileState();
        this.apiHelper.executeRawRequest(`/v2/patient/${id}`, "GET").then(response => {
            if (response.error && response.code >= 400) {
                this.setAuthError();
            }
            this.setSelectedPatientDetails(response);
        })
        //Must fetch reports seperately due to key tranform in Rails::AMS removing dashes ISO date keys :(
        this.apiHelper.executeRawRequest(`/patient/${id}/reports`, "GET").then(response => {
            this.addPatientReports(response);
        })

        this.apiHelper.executeRawRequest(`/patient/${id}/symptom_summary`).then(response => {
            this.setPatientSymptomSummary(response);
        })

        this.getPatientNotes(id);
    }

    @computed get selectedPatientReports() {
        return Object.values(this.selectedPatient.reports)
    }

    @computed get areMoreReportsToLoad() {
        return Object.keys(this.selectedPatient.reports).length > this.reportSplice;
    }

    @action setPatientNotes(notes) {
        this.selectedPatient.notes = notes;
    }

    @action loadMoreReports = () => {
        this.reportSplice += 10;
    }

    getPatientNotes = (patientID) => {
        return this.apiHelper.executeRawRequest(`/patient/${patientID || this.selectedPatient.details.id}/notes`).then(response => {
            this.setPatientNotes(response)
        })
    }

    postPatientNote = (title, note) => {
        const body = { title: title, note: note }
        this.apiHelper.executeRawRequest(`/patient/${this.selectedPatient.details.id}/notes`, 'POST', body).then(response => {
            this.getPatientNotes();
            return response
        })
    }

    postTreatmentOutcome = () => {
        this.apiHelper.executeRawRequest(`/v2/patient/${this.selectedPatient.details.id}/treatment_outcome`, 'POST', this.treatmentOutcome).then(response => {
            this.resetAfterSuccessfulUpdate();
            this.onArchive = false;
        })
    }

    @action resetAfterSuccessfulUpdate() {
        this.getPatientDetails(this.selectedPatient.details.id);
        this.resetUpdateState();
        this.onChangeDetails = false;
        this.changes.success = true;
    }

    postPatientChanges = () => {
        this.apiHelper.executeRawRequest(`/v2/patient/${this.selectedPatient.details.id}`, 'PATCH', this.changes).then(response => {
            if (!response.code) {
                this.resetAfterSuccessfulUpdate()
            } else {
                this.setErrors(response)
            }
        })
    }

    @action setErrors = (response) => {
        this.changes.errors = response.paramErrors;
    }

    @action resetUpdateState = () => {
        this.changes = {
            givenName: this.selectedPatient.details.givenName,
            familyName: this.selectedPatient.details.familyName,
            phoneNumber: this.selectedPatient.details.phoneNumber,
            treatmentEndDate: this.selectedPatient.details.treatmentEndDate,
            success: false,
            errors: {}
        }

        this.treatmentOutcome = {
            appEndDate: null,
            treatmentOutcome: null
        }

        this.temporaryPassword = "";
    }

    @action changeTreatmentEndDate(date) {
        this.changes.treatmentEndDate = date;
    }


    resetPassword = () => {
        if (this.selectedPatient.details.id > 0) {
            this.apiHelper.executeRawRequest(`/patient/${this.selectedPatient.details.id}/password-reset`, "POST").then(response => {
                this.setTemporaryPassword(response.temporaryPassword);
            })
        }
    }

    setTreatmentOutcome = (value) => {
        this.treatmentOutcome.treatmentOutcome = value;
    }

    @action setTemporaryPassword = (code) => {
        this.temporaryPassword = code;
    }

    @computed get isArchived() {
        return this.selectedPatient.details.status === "Archived"
    }

    @action closeArchiveWarning = () => {
        this.onArchiveWarning = false;
    }

    @computed get treatmentOutcomes(){
        return this.selectedPatient.details.treatmentOutcome
    }

    @action toggleUpdateOutcome = () =>{

        this.treatmentOutcome.treatmentOutcome = this.selectedPatient.details.treatmentOutcome.treatmentOutcome
        this.treatmentOutcome.appEndDate = this.selectedPatient.details.treatmentOutcome.appEndDate
        this.selectedPatient.details
        this.onArchive = true;
    }


}