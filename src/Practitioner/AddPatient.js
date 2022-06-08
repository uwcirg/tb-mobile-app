import React, { useState } from 'react';
import { DateTime } from 'luxon';
import TopPageLabel from '../../TopPageLabel';
import Form from './Form';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import useAsync from '../../../../Hooks/useAsyncWithParams';
import Success from './Success';
import { useHistory } from 'react-router-dom';
import Loading from '../../../../Practitioner/Shared/CardLoading';
import PractitionerAPI from '../API/PractitionerAPI';

const initalState = {
  category: '',
  time: null,
  note: '',
  datetime: DateTime.local().toISO(),
  tempDatetime: DateTime.local().toISO(),
};

export default function AddPatient({ patientId }) {
  const { t } = useTranslation('translation');
  const history = useHistory();

  const [state, setState] = useState({
    ...initalState,
  });

  const { execute, status, value, error, reset } = useAsync({
    asyncFunc: PractitionerAPI.addPatient,
    immediate: false,
    funcParams: [patientId, state],
  });

  const resetState = () => {
    setState({ ...initalState });
    reset();
  };

  return (
    <>
      <TopPageLabel sticky title={t('coordinator.addPatientFlow.title')} />
      {status === 'idle' && (
        <Form state={state} setState={setState} handleSubmit={execute} />
      )}
      {status === 'loading' && (
        <>
          <Box height="3rem" />
          <Loading />
        </>
      )}
      {status === 'success' && (
        <Success handleExit={history.goBack} handleReset={resetState} />
      )}
    </>
  );
}
