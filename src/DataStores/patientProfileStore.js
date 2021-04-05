import { action, observable, computed } from "mobx";
import APIHelper from './Requests'


export default class PatientProfileStore {

    constructor() {
        this.apiHelper = new APIHelper();
    }

    @observable onPasswordReset = false;
    @observable onChangeDetails = !true;

    @observable givenName = "";
    @observable familyName = "";

    @observable selectedPatient = {
        symptomSummary: {},
        reports: {},
        details: {},
        notes: [],
        loaded: false,
        authError: false
    }

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
        this.selectedPatient.authError = true;
    }

    @action resetProfileState = () => {
        this.jujselectedPatient = {
            reportsLoading: false,
            symptomSummary: {},
            reports: {},
            details: {},
            notes: [],
            loaded: false,
            authError: false
        }
    }

    @action addPatientReports = (reports) => {
        this.selectedPatient.reports =  reports;
    }

    //Get detials to fill in patient profile information
    getPatientDetails = (id) => {
        this.resetProfileState();
        this.apiHelper.executeRawRequest(`/v2/patient/${id}`, "GET").then(response => {
            if (response.error && response.code == 401) {
                this.setAuthError();
            }
            this.setSelectedPatientDetails(response);
        })
        //Must fetch reports seperately due to key tranform in Rails::AMS removing dashes ISO date keys :(
        this.apiHelper.executeRawRequest(`/patient/${id}/reports`, "GET").then(response => {
            this.addPatientReports(response);
        })

        // this.apiHelper.executeRawRequest(`/patient/${id}/symptom_summary`).then(response => {
        //     this.setPatientSymptomSummary(response);
        // })

        //this.getPatientNotes(id);
    }

    @computed get selectedPatientReports() {
        return Object.values(this.selectedPatient.reports)
    }



}