import { DateTime } from "luxon";

const participant_adherence = (participant) => {
    // debugger
    let start = DateTime.fromISO(participant.treatment_start)
    let end = DateTime.local()

    let full_days = parseInt(end.diff(start, 'days').toObject().days, 10)
    if(full_days === 0) full_days = 1

    let report_dates = participant.medication_reports.map(report =>
      DateTime.fromISO(report.timestamp).toISODate()
    )

    let unique_report_dates = Array.from(new Set(report_dates))
    return unique_report_dates.length / full_days
}

export default participant_adherence;
