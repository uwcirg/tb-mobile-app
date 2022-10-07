import { Box, Grid, Typography, Fade } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import ReportingHistoryLinks from '../../../Components/Shared/ReportingHistoryLinks';
import Priority from '../../Shared/Priority';
import Card from './Card';
import Label from '../../../Components/Label';
import FlatButton from '../../../Components/FlatButton';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';

export default function PatientDetailsCard({ patient }) {
  const { t } = useTranslation('translation');

  const { lastReport, weeksInTreatment, priority } = patient;

  const daysAgo = !!lastReport
    ? Math.round(DateTime.fromISO(lastReport.createdAt).diffNow('days').days) *
      -1
    : t('coordinator.tasksSidebar.noneYet');

  return (
    // get rid of all these spacing boxes
    // after you merge changes with other commits
    <Card title={t('coordinator.patientTableLabels.details')}>
      <Box padding="8px" bgcolor={Colors.lighterGray}>
        <Grid wrap="nowrap" container>
          <Typography>{t('coordinator.patientProfile.lastReport')}:</Typography>
          <Box flexGrow={1} />
          <Box width={'8px'} />
          <Typography>
            {daysAgo} {t('time.day_ago', { count: daysAgo })}
          </Typography>
        </Grid>
        <Box height={'5px'} />
        <Grid container>
          <Typography>
            {t('coordinator.patientTableLabels.priority')}:
          </Typography>
          <Box width={'8px'} />
          <Box flexGrow={1} />
          <Priority index={priority} />
        </Grid>
        <Box height={'5px'} />
        <TreatmentDuration weeksInTreatment={weeksInTreatment} />
        <Box height={'5px'} />
        <Grid container></Grid>
        <Box height="8px" />
        <ReportingHistoryLinks patient={patient} />
      </Box>
      <Box height="1em" />
    </Card>
  );
}

const TreatmentDuration = ({ weeksInTreatment }) => {
  const { t } = useTranslation('translation');
  return (
    <Grid container>
      <Typography>
        {t('mobileUpdate.treatment')[0].toUpperCase() +
          t('mobileUpdate.treatment').slice(1)}
        :
      </Typography>
      <Box flexGrow={1} />
      <Label
        text={`${t('educationalMessages.week')} ${weeksInTreatment} / 26`}
        backgroundColor={Colors.accentBlue}
      />
      {weeksInTreatment > 8 && <TwoMonthAlert />}
    </Grid>
  );
};

const TwoMonthAlert = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      {!checked ? (
        <Box
          margin="1em .2em"
          padding="1em"
          width={'100%'}
          bgcolor={Colors.calendarGreen}
          borderRadius="5px"
          border={`1px solid ${Colors.calendarGreen}`}
          color={Colors.darkGreen}
          boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
        >
          <Typography variant="body1">
            {/* translate */}
            Two months of treatment surpassed.
          </Typography>
          <Box marginTop=".5em" display="flex" justifyContent="flex-end">
            <FlatButton
              onClick={() => {
                console.log('clicked');
                setChecked(true);
              }}
            >
              Contact Admin
            </FlatButton>
          </Box>
        </Box>
      ) : (
        <Fade in={checked} {...(checked ? { timeout: 1000 } : {})}>
          <Box
            margin="1em .2em"
            padding="1em"
            width={'100%'}
            bgcolor={Colors.calendarGreen}
            borderRadius="5px"
            border={`1px solid ${Colors.calendarGreen}`}
            color={Colors.darkGreen}
            boxShadow="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
          >
            <Typography variant="body1">
              {/* translate */}
              Thanks for alerting your admin!
            </Typography>
            <Box marginTop=".5em" display="flex" justifyContent="flex-end">
              <CheckCircleOutline fontSize="large" />
            </Box>
          </Box>
        </Fade>
      )}
    </>
  );
};
