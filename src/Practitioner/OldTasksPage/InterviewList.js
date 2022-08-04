import React from 'react';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { Grid, Box } from '@material-ui/core';
import FlatButton from '../../Components/FlatButton';
import useAsyncWithParams from '../../Hooks/useAsyncWithParams';
import PractitionerAPI from '../../API/PractitionerAPI';
import ClickableText from '../../Basics/ClickableText';
import { Check } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

const InterviewList = observer(() => {
  const { practitionerStore } = useStores();

  const patientList = Object.values(practitionerStore.patients).filter(
    (patient) => {
      return !patient.referredForExitInterview;
    }
  );

  return (
    <Box>
      <h3>Patients ready for exit interview</h3>
      {/* need translation ^^ */}

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

  const { t } = useTranslation('translation');

  return (
    <Box paddingBottom={'1rem'} paddingRight={'3em'}>
      <Grid key={id} container>
        <ClickableText to={`/patients/${id}`} text={fullName} hideIcon />

        <Box flexGrow="1" />

        {(status === 'pending' || status === 'idle') && (
          <FlatButton onClick={execute}>
            {t('patient.home.completed.title')}
          </FlatButton>
        )}

        {status === 'success' && (
          <FlatButton backgroundColor={'approvedGreen'}>
            <Box paddingLeft={'.7em'} />
            <Check />
          </FlatButton>
        )}

        {status === 'error' && (
          <FlatButton backgroundColor={'warningRed'}>
            <Box paddingLeft={'.7em'} />
            {t('commonWords.error')}
          </FlatButton>
        )}
      </Grid>
    </Box>
  );
};

export default InterviewList;
