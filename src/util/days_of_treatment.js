import { DateTime } from "luxon";

const days_of_treatment = (participant) => {
    let start = DateTime.fromISO(participant.treatment_start)
    let end = DateTime.local()
    let full_days = parseInt(end.diff(start, 'days').toObject().days, 10)
    if(full_days === 0) full_days = 1
  
    // Goes through medication reports and grabs dates and only
    // reports where they indicate they did take their medication
    debugger
    // let all_true_reports = participant.medication_reports.map(report => {
    //   if (report.took_medication === true) {
    //     return report;
    //   }};
    
    let report_dates = all_true_reports.map(report =>
      DateTime.fromISO(report.timestamp).toISODate()
    )
  
    let unique_report_dates = Array.from(new Set(report_dates))
    return unique_report_dates.length
}

export default days_of_treatment;
