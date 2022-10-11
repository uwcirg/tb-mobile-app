
import React from 'react';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import PillIcon from '../../../Basics/Icons/Pill.js';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Typography } from '@material-ui/core';
import Symptom from '../../../Practitioner/Shared/Symptom';

import {
  Assignment,
  InsertEmoticon,
  SentimentVeryDissatisfied,
  SentimentVerySatisfied,

} from '@material-ui/icons';
import ZoomableImage from '../ZoomableImage';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Colors from '../../../Basics/Colors.js';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ReportCard from './ReportCard.js';


const Status = ({ text, icon, color }) => {
  return (
    <Grid container>
      {React.createElement(icon, { style: { color: color } })}
      <Box width="8px" />

      <Typography style={{ textTransform: 'capitalize' }}>{text}</Typography>

    </Grid>
  );
};

const AnswerText = ({ children }) => {
  return <Typography style={{ fontStyle: 'italic' }}>{children}</Typography>;
};

const Seperator = () => (
  <Box width="100%" borderTop="solid 1px lightgray" margin="8px 0" />
);

const DailyReport = ({ report, date }) => {
  const { t } = useTranslation('translation');


  if (!report)
    return (
      <Typography>

        {t('patient.progress.noReport')}: {date}

      </Typography>
    );

  const {
    whyMedicationNotTaken,
    medicationWasTaken,
    photoWasRequired,
    symptoms,
    createdAt,
    doingOkay,
    doingOkayReason,
    photoUrl,
    whyPhotoWasSkipped,
  } = report;

  const hadSymptoms = symptoms.length !== 0;

  return (
    <Box bgcolor="white" padding="0 1em">
      <ReportCard
        title={t('patient.report.didYouTake')}
        titleIcon={<PillIcon />}
        color={medicationWasTaken ? 'green' : 'red'}
        statusIcon={medicationWasTaken ? CheckCircleIcon : HighlightOffIcon}
        statusText={
          medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')
        }
      />
      <ReportCard
        title={t('patient.report.symptomsTitle')}
        titleIcon={<Assignment />}
        color={hadSymptoms ? 'red' : 'green'}
        statusIcon={hadSymptoms ? HighlightOffIcon : CheckCircleIcon}
        statusText={
          hadSymptoms
            ? t('coordinator.sideBar.symptomsSince')
            : t('coordinator.recentReports.noSymptoms')
        }
      >
        {hadSymptoms && <SymptomList symptoms={symptoms} />}
      </ReportCard>
      <ReportCard
        title={t('patient.report.moodTitle')}
        titleIcon={<InsertEmoticon />}
        color={doingOkay ? 'green' : 'red'}
        statusIcon={
          doingOkay ? SentimentVerySatisfied : SentimentVeryDissatisfied
        }
        statusText={
          doingOkay
            ? t('patient.report.doingWell')
            : t('patient.report.needSupport')
        }
      >
        {doingOkayReason && <Typography>{doingOkayReason}</Typography>}
      </ReportCard>
      <ReportCard
        title={t('commonWords.stripPhoto')}
        titleIcon={<CameraIcon />}
        color="blue"
        statusIcon={photoWasRequired ? CheckCircleIcon : RemoveCircleIcon}
        statusText={
          photoWasRequired ? '' : t('patient.report.confirmation.noPhoto')
        }
      >
        {photoWasRequired && (

          <>
            {photoUrl ? (
              <>
                <ZoomableImage
                  initialScale={0.5}
                  maxHeight="200px"
                  url={photoUrl}
                />
              </>
            ) : (
              <>
                <Status

                  text={t('report.missedPhoto')}
                  icon={HighlightOffIcon}
                  color={Colors.red}
                />
                <Seperator />

                <Typography>{t('patient.report.photo.whyUnable')}</Typography>
                <AnswerText>
                  {whyPhotoWasSkipped || t('coordinator.sideBar.noReason')}
                </AnswerText>
              </>
            )}
          </>

        )}
      </ReportCard>

    </Box>
  );
};

const SymptomList = ({ symptoms }) => {
  return (
    <ul>
      {symptoms.map((each, index) => {
        return (
          <li key={`symptom-${index}`}>
            <Symptom string={each} />
          </li>
        );
      })}
    </ul>

  );
};

export default DailyReport;
