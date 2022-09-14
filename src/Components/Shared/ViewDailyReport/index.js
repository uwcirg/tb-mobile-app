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

const ReportCard = ({ title, titleIcon, status, statusIcon, statusText }) => {
  return (
    <InputCard>
      <Box>
        <Box display="flex" alignContent="center">
          {titleIcon}
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ columnGap: '1em' }}
        >
          {React.createElement(statusIcon, {
            style: { color: status ? Colors.green : Colors.red },
          })}
          <Typography variant="h6">{statusText}</Typography>
        </Box>
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
        status={medicationWasTaken}
        statusIcon={medicationWasTaken ? CheckCircleIcon : HighlightOffIcon}
        statusText={
          medicationWasTaken ? t('commonWords.yes') : t('commonWords.no')
        }
      />

      <InputCard>
        <ExpandableCard
          hideToggle
          title={t('patient.report.symptomsTitle')}
          icon={Assignment}
        >
          <Status
            color={hadSymptoms ? Colors.red : Colors.green}
            icon={!hadSymptoms ? CheckCircleIcon : HighlightOffIcon}
            text={
              hadSymptoms
                ? t('coordinator.sideBar.symptomsSince')
                : t('coordinator.recentReports.noSymptoms')
            }
          />
          {hadSymptoms && (
            <>
              <Seperator />
              <SymptomList symptoms={symptoms} />
            </>
          )}
        </ExpandableCard>
      </InputCard>

      <InputCard>
        <ExpandableCard
          hideToggle
          title={t('patient.report.moodTitle')}
          icon={InsertEmoticon}
        >
          <Status
            text={
              doingOkay
                ? t('patient.report.doingWell')
                : t('patient.report.needSupport')
            }
            icon={
              doingOkay ? SentimentVerySatisfied : SentimentVeryDissatisfied
            }
            color={doingOkay ? Colors.green : Colors.red}
          />
          {doingOkayReason && <Typography>{doingOkayReason}</Typography>}
        </ExpandableCard>
      </InputCard>

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
    <div>
      {symptoms.map((each, index) => {
        return <Symptom key={`symptom-${index}`} string={each} />;
      })}
    </div>
  );
};

export default DailyReport;
