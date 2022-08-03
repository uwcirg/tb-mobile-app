import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

const useStyles = makeStyles({});

const InterviewList = observer(() => {
  const classes = useStyles();

  const { practitionerStore } = useStores();

  const patientList = Object.values(practitionerStore.patients);

  return (
    <div>
      {patientList?.map((patient) => {
        return (
          <p key={patient.id}>
            {patient.givenName}{' '}
            {patient.referredForExitInterview ? 'true' : 'false'}
          </p>
        );
      })}
    </div>
  );
});

export default InterviewList;
