import { toJS, action, observable, computed } from "mobx";
import { DateTime } from 'luxon';
import { addReportToOfflineCache } from './SaveReportOffline'


export default class ReportStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable error = "";

    @observable todaysDate = DateTime.local().toISODate();
    @observable todaysReportFromServer = {}
    @observable todaysReportLoaded = false;

    @action setTodaysReport = (report) => {
        this.todaysReportLoaded = true;
        this.todaysReportFromServer = report;
    }

    @computed get medicationWasTakenToday(){
        return this.todaysReportFromServer &&
        this.todaysReportFromServer.status &&
        this.todaysReportFromServer.status.tookMedication
        
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
        if (report && report.date) {
            this.todaysReportFromServer = report;
            this.rootStore.savedReports[report.date] = report;
        } else {
            console.log("error uploading last part of report");
            this.error = "there was an error"
        }
    }

    @action clearError = () => {
        this.error = "";
    }

    @action updateCurrentDate = () => {
        this.todaysDate = DateTime.local().toISODate()
    }

    getTodaysReport() {
        this.updateCurrentDate();
        this.rootStore.executeRawRequest(`/v2/daily_report?date=${this.todaysDate}`).then(res => {
            this.setTodaysReport(res);
        })
    }

    submitPhoto = () => {
        this.rootStore.hasSubmittedPhoto = true;
        if (this.checkIfOfflineAndSaveReportLocally()) {
            return
        }
        let body = this.getPhotoBody();

        //Upload photo if it was not skipped
        if (!this.rootStore.report.photoWasSkipped && this.rootStore.report.photoString) {
            this.rootStore.uploadPhoto().then(response => {
                body.photoUrl = response;
                this.rootStore.executeRawRequest('/v2/photo_reports', "POST", body).then(this.processReport)
            })
        } else {
            this.rootStore.executeRawRequest('/v2/photo_reports', "POST", body).then(this.processReport);
        }

    }

    submitMedication = () => {
        if (this.checkIfOfflineAndSaveReportLocally()) {
            return
        }
        this.rootStore.executeRawRequest('/v2/medication_reports', "POST", this.getMedicationBody()).then(this.processReport)
    }

    submitSymptoms = () => {
        if (this.checkIfOfflineAndSaveReportLocally()) {
            return
        }
        this.rootStore.executeRawRequest('/v2/symptom_reports', "POST", this.getSymptomBody()).then(this.processReport)
    }

    submitMood = () => {
        this.rootStore.hasSubmitted = true;
        if (this.checkIfOfflineAndSaveReportLocally()) {
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
        let body = {
            date: this.rootStore.report.date,
        }

        if (this.rootStore.report.photoWasSkipped) {
            body.photoWasSkipped = true;
            body.whyPhotoWasSkipped = this.rootStore.report.whyPhotoWasSkipped;
        }

        return body;
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

        if (!this.rootStore.report.tookMedication && this.rootStore.report.whyMedicationNotTaken !== null) {
            body.whyMedicationNotTaken = this.rootStore.report.whyMedicationNotTaken
        }

        return body;
    }



}
