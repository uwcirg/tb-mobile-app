import React from 'react';
import Priority from '../Shared/Priority';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    profileLink: {
        "&, &:visited": {
            color: Colors.buttonBlue,
            textDecoration: "none"
        }
    }
})


const Name = ({ fullName, id }) => {

    const classes = useStyles();
    const { push } = useStores().routingStore;
    //Handle Patient Link
    const handlePatientClick = (event) => {
        event.preventDefault();
        push(`/patients/${id}`)
    }
    return <a className={classes.profileLink} href={`/patients/${id}`} onClick={handlePatientClick}>{fullName}</a>
}

const percentComponent = (value) => {
    return `${Math.round(value * 100)}%`
}

const Translate = ({string}) => {
    const { t } = useTranslation('translation');
    const text = t(string);
    return text
}

const DaysAgo = ({days}) => {
    const {t} = useTranslation('translation');
    return  !(days === false) ? (days > 0 ? `${days} ${t('time.day_ago', { count: days })}` : t('patient.home.today')) : t('coordinator.noReports')

}

const fields = [
    {
        key: "fullName",
        displayName: <Translate string='coordinator.patientTableLabels.name' />,
        formatter: (value, patient) => <Name {...patient} />
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