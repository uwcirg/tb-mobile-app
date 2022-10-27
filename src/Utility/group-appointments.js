import { DateTime } from "luxon";

function sortByDate(a, b) {
  return (
    DateTime.fromISO(b.datetime).toMillis() -
    DateTime.fromISO(a.datetime).toMillis()
  );
}

export default function groupAppointments(appointments) {
  let grouped = {};

  function pushElement(listName, obj) {
    if (!grouped[listName]) {
      grouped[listName] = [];
    }
    grouped[listName].push(obj);
  }

  for (let apt of appointments.sort(sortByDate)) {
    const name =
      DateTime.fromISO(apt.datetime).diffNow("minutes").minutes > 0
        ? "future"
        : "past";

    pushElement(name, apt);
  }

  return grouped;
}
