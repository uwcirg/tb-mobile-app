import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Visual from '../../Basics/Icons/DoctorGroup.svg';

const useStyles = makeStyles({
  image: {
    maxWidth: '200px',
  },
  container: {
    minHeight: '100vh',
    backgroundColor: 'white',
    padding: '2em',
    width: '100%',
    flexGrow: '1',
  },
  text: {
    fontSize: '1.5em',
  },
});

// PatientListMessage

const PatientListMessage = ({ isLoading = false, tab }) => {
  const { t } = useTranslation('translation');
  const classes = useStyles();

  let message = isLoading
    ? `${t('summaries.loading')}`
    : tab === 0
    ? `${t('reviewIssues.noPateintIssues')}`
    : tab === 1
    ? `${t('reviewIssues.noPatientReviews')}`
    : tab === 2
    ? `${t('reviewIssues.noPatients')}`
    : '';

  return (
    <Grid
      alignItems="center"
      direction="column"
      container
      className={classes.container}
    >
      <img className={classes.image} src={Visual} alt={message} />
      <Box padding="2em 0">
        <Typography align="center" className={classes.text} variant="h2">
          {message}...
        </Typography>
      </Box>
      {isLoading && <CircularProgress variant="indeterminate" />}
    </Grid>
  );
};

export default PatientListMessage;
