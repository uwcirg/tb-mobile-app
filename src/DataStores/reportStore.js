//import { action, observable, computed } from "mobx";

export default class ReportStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    submitMedication = () => {
        this.rootStore.executeRawRequest('/v2/medication_reports', "POST", this.getMedicationBody()).then((json) => {
            console.log(json)
        })
    }

    submitSymptoms = () => {
        this.rootStore.executeRawRequest('/v2/symptom_reports', "POST", this.getSymptomBody()).then((json) => {
            console.log(json)
        })
    }

    submitMood = () => {
        this.rootStore.executeRawRequest('/v2/mood_reports', "POST", this.getMoodBody())
    }

    getMoodBody = () => {
        return {
            date: this.rootStore.report.date,
            doingOkay: this.rootStore.report.doingOkay,
            doingOkayReason: this.rootStore.report.supportReason
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
