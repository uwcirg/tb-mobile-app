import { DateTime } from "luxon";
import report from "../Patient/Walkthrough/ExampleReport";

const addIssuesToPatients = (patients) => {
    return patients.map(_patient => {
        const reports = _patient.unresolvedReports;
        let state = { symptoms: 0, missedReporting: 0, missedMedication: 0, feelingBad: 0, photo: 0, missedPhoto: 0, total: 0, missedMedicationDates: [] };

        let missedDays = getMissedDays(_patient)

        state.missedReporting = missedDays.length;
        state.missedMedicationDates = missedDays;

        for (let _report of reports) {

            if (_report.symptoms?.length > 0) {
                state.symptoms++;
            }

        }

        // Currently the number of unique issues
        state.total = Object.values(state).reduce((prev, current) => prev + (current > 0 % 1) , 0)

        return { ..._patient, issues: state }
    })
}

const getMissedDays = (patient) => {
    if (!patient.lastGeneralResolution) return;
    /*
    
    Todo:

    - Day of resolution if the report was missed
    - Return list of missed days

    */
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
        if(daysReport?.medicationWasTaken) continue
        days.push([iteratorDay.toISODate])
    }

    return days;
}

const getReportsMap = (patient) => {

    let reports = {};

    for (let report of patient.unresolvedReports) {
        reports[report.date] = report;
    }

    return reports
}

export default addIssuesToPatients;