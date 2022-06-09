import React, { useState } from 'react';
import { DateTime } from 'luxon';
import TopPageLabel from '../Components/Shared/TopPageLabel';
import { useTranslation } from 'react-i18next';
import { Box, TextField, Grid } from '@material-ui/core';
import InputCard from '../Components/Shared/Appointments/AddAppointment/InputCard';
import DateInput from '../Components/Shared/Appointments/AddAppointment/DateInput';
import FlatButton from '../Components/FlatButton';
import useAsync from '../Hooks/useAsyncWithParams';
import PractitionerAPI from '../API/PractitionerAPI';
import Loading from './Shared/CardLoading';
import Success from '../Components/Shared/Appointments/AddAppointment/Success';
import { useHistory } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  datetime: DateTime.local().toISO(),
};

export default function AddPatient({ patientId }) {
  const { t } = useTranslation('translation');
  const [state, setState] = useState({ ...initialState });
  const history = useHistory();

  const { execute, status, value, error, reset } = useAsync({
    asyncFunc: PractitionerAPI.addPatient,
    immediate: false,
    funcParams: [patientId, state],
  });

  // if state === body of POST, how do I set these values to the values Kyle wants?
  // { givenName: Firstname, familyName: Lastname phoneNumber: 123456789,
  // treatmentStart: DateTime.local().toISO(), ( any iso datetime ) },

  const resetState = () => {
    setState({ ...initialState });
    reset();
  };

  return (
    <>
      <TopPageLabel sticky title={t('coordinator.addPatientFlow.title')} />
      {status === 'idle' && (
        <Form state={state} setState={setState} handleSubmit={execute} />
      )}
      {status === 'pending' && (
        <>
          <Box height="3em" />
          <Loading />
        </>
      )}
      {status === 'success' && (
        <Success handleExit={history.goBack} handleReset={resetState} />
      )}
    </>
  );
}

const Form = ({ state, setState, handleSubmit }) => {
  const handleDateChange = (dt) => {
    const tempDT = dt
      .set({ hour: state.datetime.hour, minute: state.datetime.minute })
      .startOf('minute');
    setState({ ...state, datetime: tempDT.toISO() });
  };

  const { t } = useTranslation('translation');
  return (
    <Box margin="2em" maxWidth="700px">
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

      <InputCard title={t('coordinator.patientProfile.phoneNumber')}>
        <TextField
          value={state.phoneNumber}
          onChange={(e) => {
            setState({ ...state, phoneNumber: e.target.value });
          }}
          placeholder={t('coordinator.patientProfile.phoneNumber') + '...'}
          multiline
          fullWidth
          variant="outlined"
        />
      </InputCard>

      <InputCard title={t('patient.userFields.treatmentStart')}>
        <DateInput value={state.datetime} setValue={handleDateChange} />
      </InputCard>
      <Grid container>
        <Box flexGrow={1} />
        <FlatButton onClick={handleSubmit}>
          {t('coordinator.addPatientFlow.title')}
        </FlatButton>
      </Grid>
      <Box height="2.5rem" aria-hidden />
    </Box>
  );
};
