import { action, observable, computed } from "mobx";
import { DateTime } from 'luxon';

export default class ReportStore {


    /* 
        Offline Flow:

        Each step of the flow uses the individual methods in here
        
        If the request doesn't go through because the user is not online, then we should cache that users input for the day


        After each request update the object for a given day:


        Change these methods to take in a report - that way you can pass it the report from the root store or you can pass it a report saved locally:
        getMedicationBody()

        "10-19-2021": {
            photoReport
            medicationReport
            symptomReport
        }


        Another option: just save each submission as its own type and upload them individually, the downside to this is the number of requests, ie each report would then be 3 requests miniumum,
        but then data is not lost when a patient edits thier reports multiple times


        Easier option:


        When in offline mode could fall back to a previous version of the  actionbox component that tracks the status based on the locally saved report.
        When in offline, launch the old report flow that does not submit the report until the end of the flow



        ********* :)

        Can use new status part of todaysReportFrom server to capture if the aspect of the offline report has been captured or not
        
    
    
    */

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
