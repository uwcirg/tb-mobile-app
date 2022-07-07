import React from 'react';
import Progress from './Progress';
import OneStepActions from './OneStepActions/';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting';
import Reminders from './Reminders';
import MedicationReminder from './MedicationReminder';
import CachedReports from './CachedReports';
import VideoCard from './Videos';
import RequiresAction from './MissedActions';
import PushNotificationEnrollment from './PushEnrollmentReminder';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import ViewAppointments from '../../Components/Shared/Appointments/ViewAppointments';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';

const useStyles = makeStyles({
  body: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <PushNotificationEnrollment />
      <Box maxWidth="400px" padding="0 .75rem">
        <Greeting />
        <OneStepActions />
        <CachedReports />
        <RequiresAction />
        <VideoCard />
        <Alerts />
        <Progress />
        <MedicationReminder />
        <Appointments />
      </Box>
    </div>
  );
};

const Appointments = observer(() => {

  const { patientStore } = useStores();

  return <>
    {patientStore.userID && <ViewAppointments patientId={patientStore.userID} />}
  </>
})

export default HomePage;
