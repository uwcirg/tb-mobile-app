import React, { useState } from 'react';
import { DateTime } from 'luxon';
import TopPageLabel from '../Components/Shared/TopPageLabel';
import { useTranslation } from 'react-i18next';
import { Box, TextField, ButtonBase, Input, Grid } from '@material-ui/core';
import AddPatientForm from './CohortView/AddPatient';
import { makeStyles } from '@material-ui/core';
import InputCard from '../Components/Shared/Appointments/AddAppointment/InputCard';
import DateInput from '../Components/Shared/Appointments/AddAppointment/DateInput';
import FlatButton from '../Components/FlatButton';

const useStyles = makeStyles({
  body: {
    margin: '2em',
    maxWidth: '700px',
  },
});

const initialState = {
  firstName: '',
  lastName: '',
  datetime: DateTime.local().toISO(),
};

export default function AddPatient({ patientId }) {
  const { t } = useTranslation('translation');
  const classes = useStyles();
  const [state, setState] = useState({ ...initialState });

  return (
    <>
      <TopPageLabel sticky title={t('coordinator.addPatientFlow.title')} />
      <div className={classes.body}>
        <InputCard title={t('patient.userFields.firstName')}>
          <TextField
            value={state.firstName}
            onChange={(e) => {
              setState({ ...state, firstName: e.target.value });
            }}
            placeholder={t('patient.userFields.firstName') + '...'}
            multiline
            fullWidth
            variant="outlined"
          />
        </InputCard>

        <InputCard title={t('patient.userFields.lastName')}>
          <TextField
            value={state.lastName}
            onChange={(e) => {
              setState({ ...state, lastName: e.target.value });
            }}
            placeholder={t('patient.userFields.lastName') + '...'}
            multiline
            fullWidth
            variant="outlined"
          />
        </InputCard>

        <InputCard title={t('patient.userFields.treatmentStart')}>
          <DateInput
          // value={state.datetime} setValue={handleTimeChange}
          />
        </InputCard>
        <Grid container>
          <Box flexGrow={1} />
          <FlatButton>{t('coordinator.addPatientFlow.title')}</FlatButton>
        </Grid>
      </div>
    </>
  );
}
