import React from 'react';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PillIcon from '../../../Basics/Icons/Pill.js'
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../../Practitioner/Shared/Symptom';
import { Assignment, InsertEmoticon, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';
import ZoomableImage from '../ZoomableImage';
import ExpandableCard from '../../ExpandableCard';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Colors from '../../../Basics/Colors.js';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    answer: {
        fontStyle: "italic",
    }
})

const Status = ({ text, icon, color }) => {

    return (<Grid container >
        {React.createElement(icon, { style: { color: color } })}
        <Box width="8px" />
        <Typography style={{ textTransform: "capitalize" }}>
            {text}
        </Typography>
    </Grid >)
}

const AnswerText = ({ children }) => {
    const classes = useStyles()
    return (
        <Typography className={classes.answer}>{children}</Typography>
    )
}

const Seperator = () => <Box width="100%" borderTop="solid 1px lightgray" margin="8px 0" />;

const DailyReport = ({ report, date }) => {

    const { t } = useTranslation('translation');

    if (!report) return (<Typography>{t('patient.progress.noReport')}: {date}</Typography>);

    const { whyMedicationNotTaken, medicationWasTaken, photoWasRequired, symptoms, createdAt, doingOkay, doingOkayReason, photoUrl, whyPhotoWasSkipped } = report;
    const hadSymptoms = symptoms.length !== 0;

    return (<Box bgcolor="white" padding="0 1em">

        <ExpandableCard hideToggle title={t('patient.report.didYouTake')} icon={PillIcon}>
            <Status
                text={medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')}
                icon={medicationWasTaken ? CheckCircleIcon : HighlightOffIcon}
                color={medicationWasTaken ? Colors.green : Colors.red}
            />

            {!medicationWasTaken &&
                <>
                    <Seperator />
                    <Typography>{t('patient.report.whyNotTaken')}</Typography>
                    <AnswerText>{whyMedicationNotTaken || t('coordinator.sideBar.noReason')}</AnswerText>
                </>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('patient.report.symptomsTitle')} icon={Assignment}>
            <Status
                color={hadSymptoms ? Colors.red : Colors.green}
                icon={!hadSymptoms ? CheckCircleIcon : HighlightOffIcon}
                text={hadSymptoms ? t('coordinator.sideBar.symptomsSince') : t('coordinator.recentReports.noSymptoms')}
            />
            {hadSymptoms && <>
                <Seperator />
                <SymptomList symptoms={symptoms} />
            </>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('patient.report.moodTitle')} icon={InsertEmoticon}>
            <Status
                text={doingOkay ? t('patient.report.doingWell') : t('patient.report.needSupport')}
                icon={doingOkay ? SentimentVerySatisfied : SentimentVeryDissatisfied}
                color={doingOkay ? Colors.green : Colors.red}
            />
            {doingOkayReason && <Typography>{doingOkayReason}</Typography>}
        </ExpandableCard>
        <ExpandableCard hideToggle title={t('commonWords.stripPhoto')} icon={CameraIcon}>
            {photoWasRequired ? <>
                {photoUrl ? <>
                    <ZoomableImage initialScale={.5} maxHeight="200px" url={photoUrl} />
                </> : <>
                    <Status text={t('report.missedPhoto')} icon={HighlightOffIcon} color={Colors.red} />
                    <Seperator />
                    <Typography>{t('patient.report.photo.whyUnable')}</Typography>
                    <AnswerText>{whyPhotoWasSkipped || t('coordinator.sideBar.noReason')}</AnswerText>
                </>}
            </> : <Status text={t('patient.report.confirmation.noPhoto')} color={Colors.textGray} icon={RemoveCircleIcon} />}
        </ExpandableCard>

    </Box>)
}

const SymptomList = ({ symptoms }) => {
    return (
        <div>
            {symptoms.map((each, index) => {
                return <Symptom key={`symptom-${index}`} string={each} />
            })}
        </div>
    )
}

export default DailyReport;