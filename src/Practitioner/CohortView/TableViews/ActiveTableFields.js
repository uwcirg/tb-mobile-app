import React from 'react';
import Priority from '../../Shared/Priority';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import ProfileLink from './ProfileLink';
import Translate from './Translate';
import percentComponent from './Percent';

const DaysAgo = ({days}) => {
    const {t} = useTranslation('translation');
    return  !(days === false) ? (days > 0 ? `${days} ${t('time.day_ago', { count: days })}` : t('patient.home.today')) : t('coordinator.noReports')
}

const fields = [
    {
        key: "fullName",
        displayName: <Translate string='coordinator.patientTableLabels.name' />,
        formatter: (value, patient) => <ProfileLink {...patient} />
    },
    {
        key: "priority",
        displayName: <Translate string='coordinator.patientTableLabels.priority' />,
        align: "center",
        formatter: (value) => <Priority index={value} />
    },
    {
        key: "treatmentStart",
        displayName: <Translate string='coordinator.patientTableLabels.treatmentStart' />,
        formatter: (value) => `${DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)}`
    },
    {
        key: "daysSinceLastReport",
        displayName: <Translate string='coordinator.patientTableLabels.lastSubmission' />,
        formatter: value => <DaysAgo days={value} />
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