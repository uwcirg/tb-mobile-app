import React from 'react'
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PillIcon from '../../Basics/Icons/Pill.js'
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../Practitioner/Shared/Symptom';
import { Assignment, SentimentDissatisfied } from '@material-ui/icons'
import ZoomableImage from './ZoomableImage';
import ExpandableCard from '../ExpandableCard';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Colors from '../../Basics/Colors.js';

const YesNo = ({ value }) => {

    const { t } = useTranslation('translation');

    return <Grid container>
        {value ? <CheckCircleIcon style={{ color: Colors.green }} /> : <HighlightOffIcon style={{ color: Colors.red }} />}
        <Typography style={{textTransform: "capitalize"}}>{value ? t('commonWords.yes') : t('commonWords.no')}</Typography>
    </Grid>
}



const DailyReport = ({ report, date }) => {

    const { t } = useTranslation('translation');

    if (!report) return (<Typography>There was no report on {date}</Typography>);

    const { whyMedicationNotTaken, medicationWasTaken, photoWasRequired, symptoms, createdAt, doingOkay, doingOkayReason, photoUrl } = report;

    return (<Box bgcolor="white" padding="0 1em">

        <ExpandableCard hideToggle title={t('commonWords.medication')} icon={PillIcon}>
                <Typography style={{fontStyle: "italic"}}>{t('patient.report.didYouTake')}</Typography>
                <YesNo value={medicationWasTaken} />

                {whyMedicationNotTaken && <Typography>Reason: {whyMedicationNotTaken}</Typography>}
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('commonWords.symptoms')} icon={Assignment}>
            <SymptomList symptoms={symptoms} />
        </ExpandableCard>

        <ExpandableCard hideToggle title={t('patient.report.moodTitle')} icon={SentimentDissatisfied}>
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