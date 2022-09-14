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
import ExpandableCard from '../../ExpandableCard';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Colors from '../../../Basics/Colors.js';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import InputCard from '../Appointments/AddAppointment/InputCard.js';

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

const ReportCard = ({
  title,
  titleIcon,
  color,
  statusIcon,
  statusText,
  children,
}) => {
  return (
    <InputCard>
      <Box display="flex" flexDirection="column" style={{ rowGap: '1em' }}>
        <Box display="flex" justifyContent="center" alignContent="center">
          {titleIcon}
          <Typography style={{ fontSize: '1.2em' }}>{title}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ columnGap: '1em' }}
        >
          {React.createElement(statusIcon, {
            style: { color: Colors[color] },
          })}
          <Typography style={{ fontSize: '1.1em' }}>{statusText}</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
    </InputCard>
  );
};

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
        color="green"
        // needs to rely on status
        statusIcon={medicationWasTaken ? CheckCircleIcon : HighlightOffIcon}
        statusText={
          medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')
        }
      />
      <ReportCard
        title={t('patient.report.symptomsTitle')}
        titleIcon={<Assignment />}
        color="red"
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

      <InputCard>
        <ExpandableCard
          hideToggle
          title={t('commonWords.stripPhoto')}
          icon={CameraIcon}
        >
          {photoWasRequired ? (
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
          ) : (
            <Status
              text={t('patient.report.confirmation.noPhoto')}
              color={Colors.textGray}
              icon={RemoveCircleIcon}
            />
          )}
        </ExpandableCard>
      </InputCard>
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
