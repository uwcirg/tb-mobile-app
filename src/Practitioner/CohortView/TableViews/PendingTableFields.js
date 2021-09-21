import React from 'react';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../../Basics/Colors';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import RefreshIcon from '@material-ui/icons/Refresh';
import FlatButton from '../../../Components/FlatButton';

const useStyles = makeStyles({

})

const Translate = ({ string }) => {
    const { t } = useTranslation('translation');
    const text = t(string);
    return text
}

const ResetCode = ({ patient }) => {
    const { practitionerStore } = useStores();
    const launchReset = () => { practitionerStore.resetActivationCode(patient.id) }
    const { t } = useTranslation('translation');

    return <FlatButton onClick={launchReset}><RefreshIcon />{t('coordinator.addPatientFlow.resetCode')}</FlatButton>
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
        displayName: <Translate string='patient.userFields.phoneNumber' />,
    },
    {
        displayName: <Translate string="coordinator.addPatientFlow.activationCode" />,
        disableSorting: true,
        formatter: (value, patient) => <ResetCode patient={patient} />
    }
]

export default fields;