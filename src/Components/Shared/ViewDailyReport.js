import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import CheckIcon from '@material-ui/icons/Check';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import ClearIcon from '@material-ui/icons/Clear';
import PillIcon from '../../Basics/Icons/Pill.js'
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';
import Symptom from '../../Practitioner/Shared/Symptom';

const useStyles = makeStyles({
})

const DailyReport = ({ report, date }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    if(!report) return (<Typography>There was no report on {date}</Typography>);

    const { whyMedicationNotTaken, medicationWasTaken, photoWasRequired, symptoms } = report;

    return (<Box minHeight={"80vh"} bgcolor="white" padding="1em">
        <Typography>Medication</Typography>
        <Typography> {medicationWasTaken ? "Yes" : "No"}</Typography>
        {whyMedicationNotTaken && <Typography>Reason: {whyMedicationNotTaken}</Typography>}
        <Typography>Symptoms</Typography>
        <SymptomList symptoms={symptoms} />
    </Box>) 
}

const SymptomList = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    if (!(props.symptoms && props.symptoms.length > 0)) {
        return t('coordinator.recentReports.noSymptoms')
    }
    return (
        <div className={classes.symptoms}>
            {props.symptoms.map((each, index) => {
                return <Symptom key={`symptom-${index}`} string={each} />
            })}

        </div>
    )
}

export default DailyReport;