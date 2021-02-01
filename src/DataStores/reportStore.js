import { toJS, action, observable, computed } from "mobx";
import { DateTime } from 'luxon';
import { addReportToOfflineCache } from './SaveReportOffline'


export default class ReportStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable todaysReportFromServer = {}

    @action setTodaysReport = (report) => {
        this.todaysReportFromServer = report;
    }

    @computed get baseReportComplete() {

        if (this.checkOffline()) {
            return this.rootStore.report.hasSubmitted;
        }

        return this.todaysReportFromServer &&
            this.todaysReportFromServer.status &&
            this.todaysReportFromServer.status.medicationReport &&
            this.todaysReportFromServer.status.symptomReport
    }

    @computed get allReportComplete() {
        if (this.checkOffline()) {
            return this.rootStore.report.hasSubmitted && this.rootStore.report.hasSubmittedPhoto;
        }
        return this.todaysReportFromServer &&
            this.todaysReportFromServer.status &&
            this.todaysReportFromServer.status.complete
    }

    @computed get photoReportComplete() {
        if (this.checkOffline()) {
            return this.rootStore.report.hasSubmittedPhoto;

        }
        return this.todaysReportFromServer &&
            this.todaysReportFromServer.status &&
            this.todaysReportFromServer.status.photoReport
    }

    @action processReport = (report) => {
        this.todaysReportFromServer = report;
        this.rootStore.savedReports[report.date] = report;
    }

    getTodaysReport() {
        this.rootStore.executeRawRequest(`/v2/daily_report?date=${DateTime.local().toISODate()}`).then(res => {
            this.setTodaysReport(res);
        })
    }

    submitPhoto = () => {
        this.rootStore.hasSubmittedPhoto = true;
        if (this.checkIfOfflineAndSaveReportLocally()){
          return  
        } 
        let body = this.getPhotoBody();
        this.rootStore.uploadPhoto().then(response => {
            body.photoUrl = response;
            this.rootStore.executeRawRequest('/v2/photo_reports', "POST", body).then(this.processReport)
        })
    }

    submitMedication = () => {
        if (this.checkIfOfflineAndSaveReportLocally()){
            return  
          } 
        this.rootStore.executeRawRequest('/v2/medication_reports', "POST", this.getMedicationBody()).then(this.processReport)
    }

    submitSymptoms = () => {
        if (this.checkIfOfflineAndSaveReportLocally()){
            return  
          } 
        this.rootStore.executeRawRequest('/v2/symptom_reports', "POST", this.getSymptomBody()).then(this.processReport)
    }

    submitMood = () => {
        this.rootStore.hasSubmitted = true;
        if (this.checkIfOfflineAndSaveReportLocally()){
            return  
          } 
        this.rootStore.executeRawRequest('/v2/mood_reports', "POST", this.getMoodBody()).then(this.processReport)
    }

    getMoodBody = () => {
        return {
            date: this.rootStore.report.date,
            doingOkay: this.rootStore.report.doingOkay,
            doingOkayReason: this.rootStore.report.supportReason
        }
    }

    getPhotoBody = () => {
        return {
            date: this.rootStore.report.date,
        }
    }

    getSymptomBody = () => {
        let body = {
            date: this.rootStore.report.date,
            nauseaRating: this.rootStore.report.nauseaRating
        }
        this.rootStore.report.selectedSymptoms.map((value) => {
            body[value] = true
        })
        return body;
    }

    checkIfOfflineAndSaveReportLocally = () => {

        if (this.checkOffline()) {
            addReportToOfflineCache(toJS(this.rootStore.report));
            return true
        }
        return false
    }

    checkOffline = () => {
        return navigator && !navigator.onLine;
    }

    getMedicationBody = () => {
        let body = {
            date: this.rootStore.report.date,
            medicationWasTaken: this.rootStore.report.tookMedication,
            datetimeTaken: this.rootStore.report.timeTaken
        }

        if (this.rootStore.report.whyMedicationNotTaken !== null) {
            body.whyMedicationNotTaken = this.rootStore.report.whyMedicationNotTaken
        }

        return body;
    }



}
