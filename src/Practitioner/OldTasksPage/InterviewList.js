import React from 'react';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Grid, Box } from '@material-ui/core';
import FlatButton from '../../Components/FlatButton';
import useAsyncWithParams from '../../Hooks/useAsyncWithParams';
import PractitionerAPI from '../../API/PractitionerAPI';
import ClickableText from '../../Basics/ClickableText';

const InterviewList = observer(() => {
  const { practitionerStore } = useStores();

  const patientList = Object.values(practitionerStore.patients).filter(
    (patient) => {
      return !patient.referredForExitInterview;
    }
  );

  console.log(patientList);

  return (
    <Box>
      <h3>Patients ready for exit interview</h3>
      {patientList?.map((patient) => {
        return <PatientData {...patient} />;
      })}
    </Box>
  );
});

const PatientData = ({ id, fullName }) => {
  const { execute, status } = useAsyncWithParams({
    asyncFunc: PractitionerAPI.markExitInterviewAsComplete,
    immediate: false,
    funcParams: [id],
  });

  let patientChecked =
    status === 'idle'
      ? 'Completed?'
      : status === 'pending'
      ? 'pending'
      : 'check!';

  return (
    <Box paddingBottom={'1rem'} paddingRight={'3em'}>
      <Grid key={id} container>
        <ClickableText to={`/patients/${id}`} text={fullName} hideIcon />
        <Box flexGrow="1" />
        {status === 'success' && (
          <FlatButton backgroundColor={'approvedGreen'}>
            {patientChecked}
          </FlatButton>
        )}

        {(status === 'pending' || status === 'idle') && (
          <FlatButton onClick={execute}>{patientChecked}</FlatButton>
        )}
      </Grid>
    </Box>
  );
};

export default InterviewList;
