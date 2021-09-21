import React from 'react';
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import RefreshIcon from '@material-ui/icons/Refresh';
import FlatButton from '../../../Components/FlatButton';
import Translate from './Translate';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    button:{
        fontSize: "1em"
    }
})

const ResetCode = ({ patient }) => {
    const { practitionerStore } = useStores();
    const launchReset = () => { practitionerStore.resetActivationCode(patient.id) }
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return <FlatButton className={classes.button} onClick={launchReset}><RefreshIcon />{t('coordinator.addPatientFlow.resetCode')}</FlatButton>
}

const fields = [
    {
        key: "fullName",
        displayName: <Translate string='coordinator.patientTableLabels.name' />
    },
    {
        key: "treatmentStart",
        displayName: <Translate string='coordinator.patientTableLabels.treatmentStart' />,
        formatter: (value) => `${DateTime.fromISO(value).toLocaleString(DateTime.DATE_MED)}`
    },
    {
        key: "phoneNumber",
        disableSorting: true,
        displayName: <Translate string='patient.userFields.phoneNumber' />,
    },
    {
        displayName: <Translate string="coordinator.addPatientFlow.activationCode" />,
        disableSorting: true,
        formatter: (value, patient) => <ResetCode patient={patient} />
    }
]

export default fields;