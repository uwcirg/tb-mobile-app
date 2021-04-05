import { action, observable, computed } from "mobx";
import APIHelper from './Requests'


export default class PatientProfileStore {

    constructor() {
        this.apiHelper = new APIHelper();
    }

    @observable onPasswordReset = false;
    @observable onChangeDetails = !true;


    @observable selectedPatient = {
        symptomSummary: {},
        reports: {},
        details: {},
        notes: [],
        loaded: false,
        accessError: false
    }

    @observable changes = {
        givenName: "",
        familyName: "", 
        phoneNumber: ""
    }

    @observable reportSplice = 10;

    @action toggleOnPasswordReset = () => {
        this.onPasswordReset = !this.onPasswordReset;
    }

    @action toggleOnChangeDetails = () => {
        this.onChangeDetails = !this.onChangeDetails;
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
            accessError: false
        }
        this.reportSplice = 10;
    }

    @action addPatientReports = (reports) => {
        this.selectedPatient.reports =  reports;
    }

    @action setPatientSymptomSummary = (symptoms) => {
        this.selectedPatient.symptomSummary = symptoms
    }

    @action initalizeChanges = () => {
        this.changes.familyName = this.selectedPatient.details.familyName;
        this.changes.givenName = this.selectedPatient.details.givenName;
        this.changes.phoneNumber = this.selectedPatient.details.phoneNumber;
    }

    @computed get hasChanges(){
        return this.changes.givenName !== this.selectedPatient.details.givenName ||
        this.changes.familyName != this.selectedPatient.details.familyName ||
        this.changes.phoneNumber != this.selectedPatient.details.phoneNumber
    }

    //Get detials to fill in patient profile information
    getPatientDetails = (id) => {
        this.resetProfileState();
        this.apiHelper.executeRawRequest(`/v2/patient/${id}`, "GET").then(response => {
            if (response.error && response.code >= 400 ) {
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
        return Object.values(this.selectedPatient.reports).splice(0,this.reportSplice)
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

    postPatientChanges = () => {
        this.apiHelper.executeRawRequest(`/v2/patient/${this.selectedPatient.details.id}`,'PATCH', this.changes).then(response =>{
            if(!response.error){
                console.log("Success")
                this.getPatientDetails(this.selectedPatient.details.id);
            }
        })
    }





}