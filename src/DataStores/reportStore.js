import { action, observable, computed } from "mobx";

export default class ReportStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    submitMedication = () => {
            this.rootStore.executeRawRequest(`/v2/medication_reports`, "POST", this.getMedicationBody()).then((json) => {
                console.log(json)
            })
    }

    getMedicationBody = () => {
        let body = {
            medicationWasTaken: this.rootStore.report.tookMedication,
            date: this.rootStore.report.date,
            datetimeTaken: this.rootStore.report.timeTaken
        }

        if(this.rootStore.report.whyMedicationNotTaken !== null){
            body.whyMedicationNotTaken = this.rootStore.report.whyMedicationNotTaken
        }

        return body;
    }



}
