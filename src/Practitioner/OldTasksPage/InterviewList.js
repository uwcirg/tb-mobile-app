import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Grid, Box } from '@material-ui/core';
import FlatButton from '../../Components/FlatButton';
import useAsyncWithParams from '../../Hooks/useAsyncWithParams';
import PractitionerAPI from '../../API/PractitionerAPI';

const useStyles = makeStyles({});

const InterviewList = observer(() => {
  const { practitionerStore } = useStores();

  const patientList = Object.values(practitionerStore.patients).filter(
    (patient) => {
      return (
        !patient.referredForExitInterview && patient.weeksInTreatment <= 30
      );
    }
  );

  return (
    <div>
      {patientList?.map((patient) => {
        return <PatientData {...patient} />;
      })}
    </div>
  );
});

const PatientData = ({ id, givenName }) => {
  const { execute, status } = useAsyncWithParams({
    asyncFunc: PractitionerAPI.markExitInterviewAsComplete,
    immediate: false,
    funcParams: [id],
  });

  function handlePatientChecked() {
    execute();
  }

  let patientChecked =
    status === 'idle'
      ? 'Completed?'
      : status === 'pending'
      ? 'pending'
      : 'check!';
  console.log(patientChecked);

  return (
    <Grid key={id} container>
      <p>{givenName} </p>
      <Box flexGrow="1" />
      <FlatButton onClick={handlePatientChecked}>{patientChecked}</FlatButton>
    </Grid>
  );
};

export default InterviewList;
