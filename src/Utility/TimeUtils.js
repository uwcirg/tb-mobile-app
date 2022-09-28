import { DateTime } from 'luxon';

function daysSinceISODateTime(isoDateTime) {
  return DateTime.fromISO(isoDateTime).diffNow('days').days * -1;
}

function daysSincePhotoRequest(isoDateTime) {
  return DateTime.fromISO(isoDateTime).endOf('day').diffNow('days').days * -1;
}

const checkWasToday = (isoTime) => {
  return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate();
};

let DATETIME_MED_NO_YEAR = { ...DateTime.DATETIME_MED };
delete DATETIME_MED_NO_YEAR.year;

export {
  daysSinceISODateTime,
  daysSincePhotoRequest,
  checkWasToday,
  DATETIME_MED_NO_YEAR,
};
