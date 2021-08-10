import {DateTime} from "luxon"

export function daysSinceISODateTime(isoDateTime){
    return DateTime.fromISO(isoDateTime).diffNow("days").days * -1;
}