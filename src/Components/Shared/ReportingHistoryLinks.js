import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import { CameraAlt, ListAlt, Event, ViewList } from '@material-ui/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import IssueCard from '../../Practitioner/ReviewPatients/IssueDetails/IssueCard';

const useStyles = makeStyles({
  button: {
    width: '60px',
    color: Colors.buttonBlue,
    backgroundColor: Colors.actionBlue,
    padding: '1em .2em',
    borderRadius: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    fontSize: '.9em',
    textTransform: 'capitalize',
    color: Colors.buttonBlue,
  },
});

const ReportingHistoryLinks = ({ patient }) => {
  const { t } = useTranslation('translation');

  return (
    <IssueCard title={t('commonWords.reportingSummary')} icon={<ViewList />}>
      <Box flexGrow={1} borderRadius="5px" padding="8px">
        <Grid alignItems="center" container justify="space-between">
          <SingleButton
            to={`${patient.id}/reports/calendar`}
            icon={<Event style={{ fontSize: '2em' }} />}
            text={t('patient.tabNames.calendar')}
          />
          <SingleButton
            to={`${patient.id}/reports/list`}
            icon={<ListAlt style={{ fontSize: '2em' }} />}
            text={t('commonWords.summary')}
          />
          <SingleButton
            to={`${patient.id}/reports/photos`}
            icon={<CameraAlt style={{ fontSize: '2em' }} />}
            text={t('commonWords.photos')}
          />
        </Grid>
      </Box>
    </IssueCard>
  );
};

const SingleButton = ({ icon, text, to }) => {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      textAlign="center"
      style={{ rowGap: '.5em' }}
    >
      <ButtonBase className={classes.button} component={Link} to={to}>
        {icon}
      </ButtonBase>
      <Typography className={classes.label}>{text}</Typography>
    </Box>
  );
};

export default ReportingHistoryLinks;
