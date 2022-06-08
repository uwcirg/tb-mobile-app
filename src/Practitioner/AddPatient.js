import React, { useState } from 'react';
import { DateTime } from 'luxon';
import TopPageLabel from '../Components/Shared/TopPageLabel';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';

// import Success from './Success';
// import { useHistory } from 'react-router-dom';
// import Loading from '../../../../Practitioner/Shared/CardLoading';
// import PractitionerAPI from '../API/PractitionerAPI';

const initalState = {
  category: '',
  time: null,
  note: '',
  datetime: DateTime.local().toISO(),
  tempDatetime: DateTime.local().toISO(),
};

export default function AddPatient({ patientId }) {
  const { t } = useTranslation('translation');
  // const history = useHistory();

  // const [state, setState] = useState({
  //   ...initalState,
  // });

  // const { execute, status, value, error, reset } = useAsync({
  //   asyncFunc: PractitionerAPI.addPatient,
  //   immediate: false,
  //   funcParams: [patientId, state],
  // });

  // const resetState = () => {
  //   setState({ ...initalState });
  //   reset();
  // };

  return (
    <>
      <TopPageLabel sticky title={t('coordinator.addPatientFlow.title')} />
      <p>Hello!</p>
      {/* {status === 'idle' && (
        // <Form state={state} setState={setState} handleSubmit={execute} />
        // Need new form
        <p>Issa me!</p>
      )}
      {status === 'loading' && (
        <>
          <Box height="3rem" />
          <Loading />
        </>
      )}
      {status === 'success' && (
        // <Success handleExit={history.goBack} handleReset={resetState} />
        // need different route
        <p>Nice!</p>
      )} */}
    </>
  );
}
