import React from 'react';
import Translate from './Translate';
import ProfileLink from './ProfileLink';
import percentComponent from './Percent';
import {DateTime} from 'luxon';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

const ActiveDates = ({patient}) => {
    const { t } = useTranslation('translation');
    const dateFormat = {month: "short",day:"numeric", year: "numeric" }
    const end = DateTime.fromISO(patient.treatmentEndDate)
    const start = DateTime.fromISO(patient.appStartTime) 

    const diffDays = Math.round(end.diff(start,'days').days)

    return(
        <Grid container justify="space-between">
          <span>{`${start.toLocaleString(dateFormat)} - ${end.toLocaleString(dateFormat)}`}</span>
          <span>{`${diffDays} ${t('time.day',{count: diffDays})}`}</span>
        </Grid>

    )
}

const fields = [
    {
        key: "fullName",
        displayName: <Translate string='coordinator.patientTableLabels.name' />,
        formatter: (value, patient) => <ProfileLink {...patient} />
    },
    {
        key: "treatmentStart",
        displayName: <Translate string='Active Dates' />,
        formatter: (v,patient) => <ActiveDates patient={patient} />
    },
    {
        key: "adherence",
        displayName: <Translate string='coordinator.patientTableLabels.adherence' />,
        formatter: percentComponent,
        align: "right"
    },
    {
        key: "photoAdherence",
        displayName: <Translate string='coordinator.patientTableLabels.photoAdherence' />,
        formatter: percentComponent,
        align: "right"
    }
]

export default fields;