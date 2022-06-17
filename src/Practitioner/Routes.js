import React from 'react';
import Messages from '../Messaging/PractitionerMessaging';
import PatientsView from './CohortView';
import ReviewPatients from './ReviewPatients';
import Settings from './Settings/index';
import PatientProfile from './PatientProfile';
import OldTasksPage from './OldTasksPage';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

const Routes = () => {
  const location = useLocation();

  return (
    <Switch>
      <Route path="/messaging" children={<Messages />} />
      <Route path="/settings" children={<Settings />} />
      <Route path="/patients/:id" children={<PatientProfile />} />
      <Route path="/patients" children={<PatientsView />} />
      <Route path="/old-tasks" children={<OldTasksPage />} />
      <Route path="/home" children={<ReviewPatients />} />
      <Route path="/">
        <Redirect
          to={{
            pathname: '/home/needs-review',
            state: { from: location },
          }}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
