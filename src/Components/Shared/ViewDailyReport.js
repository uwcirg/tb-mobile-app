import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PillIcon from '../../Basics/Icons/Pill.js'
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../Practitioner/Shared/Symptom';
import { Assignment, SentimentDissatisfied } from '@material-ui/icons'
import Details from '@material-ui/icons/InsertChart';
import ZoomableImage from './ZoomableImage';
import ExpandableCard from '../ExpandableCard';

const useStyles = makeStyles({
})

const Label = ({ text, icon }) => {
    return <Box padding=".5em" borderRadius="4px" bgcolor={Colors.lighterGray}>
        <Grid container>
            {icon}
            <Box width=".5em" />
            <Typography>{text}</Typography>
        </Grid>
    </Box>
}

const DailyReport = ({ report, date }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    if (!report) return (<Typography>There was no report on {date}</Typography>);

    const { whyMedicationNotTaken, medicationWasTaken, photoWasRequired, symptoms, createdAt, doingOkay, doingOkayReason, photoUrl } = report;

    return (<Box minHeight={"80vh"} bgcolor="white" padding="1em">

        <ExpandableCard hideToggle title={t('commonWords.medication')} icon={PillIcon}>
            <Typography>Took medication: {medicationWasTaken ? "Yes" : "No"}</Typography>
            {whyMedicationNotTaken && <Typography>Reason: {whyMedicationNotTaken}</Typography>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('commonWords.symptoms')} icon={Assignment}>
            <SymptomList symptoms={symptoms} />
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('coordinator.cardTitles.requestedSupport')} icon={SentimentDissatisfied}>
            <Typography>{!doingOkay ? t('commonWords.yes') : t('commonWords.no')}</Typography>
            {doingOkayReason && <Typography>{doingOkayReason}</Typography>}
        </ExpandableCard>


        <ExpandableCard hideToggle title={t('commonWords.stripPhoto')} icon={CameraIcon}>
            {photoUrl && <ZoomableImage initialScale={.5} maxHeight="200px" url={photoUrl} />}
        </ExpandableCard>

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