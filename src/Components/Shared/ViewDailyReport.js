import React from 'react'
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PillIcon from '../../Basics/Icons/Pill.js'
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../Practitioner/Shared/Symptom';
import { Assignment, SentimentDissatisfied, SentimentSatisfied } from '@material-ui/icons'
import ZoomableImage from './ZoomableImage';
import ExpandableCard from '../ExpandableCard';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Colors from '../../Basics/Colors.js';

const Seperator = () => <Box width="100%" borderTop="solid 1px lightgray" margin="8px 0" />;

const YesNo = ({ value }) => {

    const { t } = useTranslation('translation');

    return <Grid container>
        {value ? <CheckCircleIcon style={{ color: Colors.green }} /> : <HighlightOffIcon style={{ color: Colors.red }} />}
        <Box width="8px" />
        <Typography style={{ textTransform: "capitalize" }}>
            {value ? t('commonWords.yes') : t('commonWords.no')}
        </Typography>
    </Grid>
}

const DoingOkay = ({ value }) => {

    const { t } = useTranslation('translation');

    return <Grid container>
        {value ? <CheckCircleIcon style={{ color: Colors.green }} /> : <HighlightOffIcon style={{ color: Colors.red }} />}
        <Box width="8px" />
        <Typography style={{ textTransform: "capitalize" }}>
            {value ? t('patient.report.doingWell') : t('patient.report.needSupport')}
        </Typography>
    </Grid>
}

const DailyReport = ({ report, date }) => {

    const { t } = useTranslation('translation');

    if (!report) return (<Typography>There was no report on {date}</Typography>);

    const { whyMedicationNotTaken, medicationWasTaken, photoWasRequired, symptoms, createdAt, doingOkay, doingOkayReason, photoUrl } = report;
    const hadSymptoms = symptoms.length !== 0;

    return (<Box bgcolor="white" padding="0 1em">

        <ExpandableCard hideToggle title={t('patient.report.didYouTake')} icon={PillIcon}>
            {/* <Typography style={{ fontStyle: "italic" }}>{t('patient.report.didYouTake')}</Typography> */}
            <YesNo value={medicationWasTaken} />

            {!medicationWasTaken &&
                <>
                    <Seperator />
                    <Typography style={{ fontStyle: "italic" }}>{t('patient.report.whyNotTaken')}</Typography>
                    <Typography>{whyMedicationNotTaken || "No reason given"}</Typography>
                </>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('patient.report.symptomsTitle')} icon={Assignment}>
            {/* <Typography style={{ fontStyle: "italic" }}>{t('patient.report.symptomsTitle')}</Typography> */}
            <Grid container>
                {!hadSymptoms ? <CheckCircleIcon style={{ color: Colors.green }} /> : <HighlightOffIcon style={{ color: Colors.red }} />}
                <Box width="8px" />
                <Typography>{hadSymptoms ? t('coordinator.sideBar.symptomsSince') : t('coordinator.recentReports.noSymptoms')}</Typography>
            </Grid>
            {hadSymptoms && <>
                <Seperator />
                <SymptomList symptoms={symptoms}  />
            </>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('patient.report.moodTitle')} icon={SentimentDissatisfied}>
            <DoingOkay value={doingOkay} />
            {doingOkayReason && <Typography>{doingOkayReason}</Typography>}
        </ExpandableCard>


        <ExpandableCard hideToggle title={t('commonWords.stripPhoto')} icon={CameraIcon}>
            {photoUrl && <ZoomableImage initialScale={.5} maxHeight="200px" url={photoUrl} />}
        </ExpandableCard>

    </Box>)
}

const SymptomList = ({symptoms}) => {
    const { t } = useTranslation('translation');

    if (!(symptoms && symptoms.length > 0)) {
        return t('coordinator.recentReports.noSymptoms')
    }
    return (
        <div>
            {symptoms.map((each, index) => {
                return <Symptom key={`symptom-${index}`} string={each} />
            })}
        </div>
    )
}

export default DailyReport;