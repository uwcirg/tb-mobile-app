import { DateTime } from 'luxon';

const checkWasToday = (isoTime) => {
  return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate();
};

export default checkWasToday;
