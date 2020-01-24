import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {DateTime} from 'luxon'

const ReportSymptoms = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore }) => {

    const display = DateTime.fromISO(patientStore.medicationTime).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);

    return(<p>{display}</p>)
}));

export default ReportSymptoms;
