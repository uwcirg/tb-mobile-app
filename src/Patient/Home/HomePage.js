import React from 'react';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'
import Reminders from './Reminders'
import MedicationReminder from './MedicationReminder'
import CachedReports from './CachedReports'
import VideoCard from './Videos'
import MissedReports from './MissedDays'
import PushNotificationEnrollment from './PushEnrollmentReminder'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  body:{
    width: '100%',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray
  }
})

const HomePage = () => {
    const classes = useStyles();
    return (
        <div className={classes.body}>
             {/* Some of these components are conditionally rendered within thier implementaion */}
            <PushNotificationEnrollment />
            <Greeting />
            <ActionBox />
            <MissedReports />
            <VideoCard />
            <CachedReports />
            <Alerts />
            <Progress />
            <MedicationReminder />
            <Reminders />
        </div>
    )

};

export default HomePage;

