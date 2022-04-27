import { DateTime } from "luxon";

const sum = (prev, current) => prev + current;

const getReportsMap = (patient) => {

    let reports = {};

    for (let report of patient.unresolvedReports) {
        reports[report.date] = report;
    }

    return reports
}

class PatientIssueState {

    constructor(patient) {
        this.goodDays = [];
        this.symptomCounts = this.processSymptoms(patient.unresolvedReports);
        this.missedDays = this.processMissedDays(patient);
        this.unreviewedPhotos = patient.unreviewedPhotos;
    }

    get state(){
        return ( {
            goodDays: this.goodDays.length,
            missedReporting: this.numberOfMissedDays,
            symptoms: this.numberOfSymptoms,
            unreviewedPhotos: this.unreviewedPhotos.length,
        })
    }

    get total() {
        return this.numberOfSymptoms
    }

    get numberOfMissedDays() {
        return this.missedDays.length
    }

    get numberOfSymptoms() {
        return Object.values(this.symptomCounts).reduce(sum, 0)
    }

    processSymptoms(reports) {
        let localCount = {};
        for (let report of reports) {
            report.symptoms.forEach(symptom => {
                if (localCount[symptom]) {
                    localCount[symptom]++;
                } else {
                    localCount[symptom] = 1;
                }
            })
        }
        return localCount;
    }

    processMissedDays(patient) {
        if (!patient.lastGeneralResolution) return;

        let reportsMap = getReportsMap(patient);
        let iteratorDay = DateTime.fromISO(patient.lastGeneralResolution).startOf('day');
        const endDay = DateTime.local().startOf('day');

        const getReportForDate = () => {
            return reportsMap[`${iteratorDay.toISODate()}`];
        }

        const goToNextDay = () => {
            iteratorDay = iteratorDay.plus({ days: 1 })
        }

        let days = [];

        while (!iteratorDay.equals(endDay)) {
            goToNextDay();
            let daysReport = getReportForDate();
            if (daysReport?.medicationWasTaken){
                this.goodDays.push(iteratorDay.toISODate)
                continue
            } 
            days.push(iteratorDay.toISODate)
        }

        return days;
    }

}

function addIssuesToPatients(patients) {
    return patients.map(patient => {
        // let state = {symptoms: 0, missedReporting: 0, missedMedication: 0, feelingBad: 0, photo: 0, missedPhoto: 0, total: 0, missedMedicationDates: [], symptomCounts: {} };
        return { ...patient, issues: new PatientIssueState(patient) }
    })
}


export default addIssuesToPatients;