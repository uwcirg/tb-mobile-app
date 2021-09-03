import {DateTime} from "luxon"

function daysSinceISODateTime(isoDateTime){
    return DateTime.fromISO(isoDateTime).diffNow("days").days * -1;
}

function daysSincePhotoRequest(isoDateTime){
    return DateTime.fromISO(isoDateTime).endOf("day").diffNow("days").days * -1;
}

export {daysSinceISODateTime,daysSincePhotoRequest}