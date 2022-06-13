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
  givenName: '',
  familyName: '',
  phoneNumber: '',
  treatmentStart: DateTime.local().toISO(),
};

export default function AddPatient() {
  const { t } = useTranslation('translation');
  const [state, setState] = useState({ ...initialState });
  const history = useHistory();

  const { execute, status, reset, value, error } = useAsync({
    asyncFunc: PractitionerAPI.addPatient,
    immediate: false,
    funcParams: [state],
  });

  // if response has field called error or status === error...
  // let em know and show + tell what's wrong

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
      {status === 'success' && !!value?.paramErrors && (
        <>
          <Box color="red" padding="1em">
            {`${t('commonWords.error')}: ${t('commonWords.fillAll')}`}
          </Box>
          <Form
            state={state}
            error={value?.paramErrors}
            setState={setState}
            handleSubmit={execute}
          />
        </>
      )}
      {status === 'success' && !!!value?.paramErrors && (
        <>
          <Success handleExit={history.goBack} handleReset={resetState} />
        </>
      )}
      {/* check what is in value response to see if it is valid for phone # */}
      {/* build request within this file */}
    </>
  );
}

const Form = ({ state, setState, handleSubmit, error }) => {
  const handleDateChange = (dt) => {
    const tempDT = dt
      .set({
        hour: state.treatmentStart.hour,
        minute: state.treatmentStart.minute,
      })
      .startOf('minute');
    setState({ ...state, treatmentStart: tempDT.toISO() });
  };

  const validPhone = state.phoneNumber.length >= 9;

  const submitDisabled =
    state.firstName === '' || state.lastName === '' || !validPhone;

  const { t } = useTranslation('translation');
  return (
    <Box padding="1em" maxWidth="700px">
      <InputCard title={`${t('patient.userFields.firstName')} *`}>
        <TextField
          value={state.givenName}
          onChange={(e) => {
            setState({ ...state, givenName: e.target.value });
          }}
          placeholder={t('patient.userFields.firstName') + '...'}
          multiline
          fullWidth
          variant="outlined"
          error={error?.givenName ? true : false}
        />
      </InputCard>

      <InputCard title={`${t('patient.userFields.lastName')} *`}>
        <TextField
          value={state.familyName}
          onChange={(e) => {
            setState({ ...state, familyName: e.target.value });
          }}
          placeholder={t('patient.userFields.lastName') + '...'}
          multiline
          fullWidth
          variant="outlined"
          error={error?.familyName ? true : false}
        />
      </InputCard>

      <InputCard title={`${t('coordinator.patientProfile.phoneNumber')} *`}>
        {error?.phoneNumber && (
          <Box color="red" padding="0">
            {' '}
            {t('coordinator.patientProfile.editDetails.inputError')}
          </Box>
        )}
        <TextField
          value={state.phoneNumber}
          onChange={(e) => {
            setState({ ...state, phoneNumber: e.target.value });
          }}
          placeholder={t('coordinator.patientProfile.phoneNumber') + '...'}
          multiline
          fullWidth
          variant="outlined"
          error={error?.phoneNumber ? true : false}
        />
      </InputCard>

      <InputCard title={t('patient.userFields.treatmentStart')}>
        <DateInput value={state.treatmentStart} setValue={handleDateChange} />
      </InputCard>
      <Grid container>
        <Box flexGrow={1} />
        <FlatButton onClick={handleSubmit} disabled={submitDisabled}>
          {t('coordinator.addPatientFlow.title')}
        </FlatButton>
      </Grid>
      <Box height="3.5rem" aria-hidden />
    </Box>
  );
};
