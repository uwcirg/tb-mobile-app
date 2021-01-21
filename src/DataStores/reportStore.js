import { action, observable, computed } from "mobx";
import { DateTime } from 'luxon';

export default class ReportStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable todaysReportFromServer = {}

    @action setTodaysReport = (report) => {
        this.todaysReportFromServer = report;
    }

    @computed get baseReportComplete(){
        return this.todaysReportFromServer.status && 
        this.todaysReportFromServer.status.medicationReport &&
        this.todaysReportFromServer.status.symptomReport  
    }

    @computed get allReportComplete(){
        return this.todaysReportFromServer.status &&
        this.todaysReportFromServer.status.complete
    }

    @computed get photoReportComplete(){
        return this.todaysReportFromServer.status && this.todaysReportFromServer.status.photoReport
    }

    @action processReport = (report) =>{
        this.todaysReportFromServer = report;
    }

    getTodaysReport() {
        this.rootStore.executeRawRequest(`/v2/daily_report?date=${DateTime.local().toISODate()}`).then(res => {
            this.setTodaysReport(res);
        })
    }

    submitPhoto = () => {
        let body = this.getPhotoBody();

        this.rootStore.uploadPhoto().then(response => {
            body.photoUrl = response;
            this.rootStore.executeRawRequest('/v2/photo_reports', "POST", body).then(this.processReport)
        })
    }

    submitMedication = () => {
        this.rootStore.executeRawRequest('/v2/medication_reports', "POST", this.getMedicationBody()).then(this.processReport)
    }

    submitSymptoms = () => {
        this.rootStore.executeRawRequest('/v2/symptom_reports', "POST", this.getSymptomBody()).then(this.processReport)
    }

    submitMood = () => {
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
