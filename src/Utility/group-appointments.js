import { DateTime } from 'luxon';

function sortByDate(a, b) {
  return (
    DateTime.fromISO(b.datetime).toMillis() -
    DateTime.fromISO(a.datetime).toMillis()
  );
}

export default function groupAppointments(appointments) {
  let grouped = {};

  for (let apt of appointments.sort(sortByDate)) {
    if (DateTime.fromISO(apt.datetime).diffNow('minutes').minutes > 0) {
      if (!grouped.future) {
        grouped.future = [];
      } else {
        grouped.future.push(apt);
      }
    } else {
      if (!grouped.past) {
        grouped.past = [];
      } else {
        grouped.past.push(apt);
      }
    }
  }

  return grouped;
}
