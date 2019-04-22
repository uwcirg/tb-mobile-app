import { DateTime } from "luxon";

const days_of_treatment = (participant) => {
  let start = DateTime.fromISO(participant.treatment_start)
  let end = DateTime.local()
  let full_days = parseInt(end.diff(start, 'days').toObject().days, 10)
  if(full_days === 0) full_days = 1
  return full_days
}

export default days_of_treatment;
