import { Box, Grid, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import ReportingHistoryLinks from '../../../Components/Shared/ReportingHistoryLinks';
import Priority from '../../Shared/Priority';
import Card from './Card';
import Label from '../../../Components/Label';

export default function PatientDetailsCard({ patient }) {
  const { t } = useTranslation('translation');

  const { lastReport, weeksInTreatment, priority } = patient;
  console.log(lastReport);

  const daysAgo = !!lastReport
    ? Math.round(DateTime.fromISO(lastReport.createdAt).diffNow('days').days) *
      -1
    : t('coordinator.tasksSidebar.noneYet');

  return (
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
        <Grid container>
          <Typography>{t('mobileUpdate.treatment')}:</Typography>
          <Box width={'8px'} />
          <Box flexGrow={1} />
          <Label
            text={`${t('educationalMessages.week')} ${weeksInTreatment} / 26`}
            backgroundColor={Colors.accentBlue}
          />
        </Grid>
        <Box height={'5px'} />
        <Grid container></Grid>
        <Box height="8px" />
        <ReportingHistoryLinks patient={patient} />
      </Box>
      <Box height="1em" />
    </Card>
  );
}
