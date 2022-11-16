import React from "react";
import Messages from "../Messaging/PractitionerMessaging";
import PatientsView from "./CohortView";
import ReviewPatients from "./ReviewPatients";
import Settings from "./Settings/index";
import PatientProfile from "./PatientProfile";
import OldTasksPage from "./OldTasksPage";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import AddPatient from "./AddPatient";
import AddAppointment from "../Components/Shared/Appointments/AddAppointment";
import AppointmentsPage from "./PatientProfile/Dialogs/AppointmentsPage";
import useStores from "../Basics/UseStores";
import PatientDetailsReport from "./Shared/PatientDetailsReport";

const Routes = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const history = useHistory();

  return (
    <Switch>
      <Route path="/messaging" children={<Messages />} />
      <Route path="/settings" children={<Settings />} />
      <Route path="/patients/add-patient" children={<AddPatient />} />
      <Route path="/patients/:id/reports" children={<PatientDetailsReport />} />
      <Route path="/patients/:id/add-appointment">
        <AddAppointment patientId={id} />
      </Route>
      <Route path="/patients/:id/appointments">
        <AppointmentsPage patientId={id} />
      </Route>
      <Route path="/patients/:id" children={<PatientProfile />} />
      <Route path="/patients" children={<PatientsView />} />
      <Route path="/old-tasks" children={<OldTasksPage />} />
      <Route path="/home" children={<ReviewPatients />} />
      <Route path="/">
        <Redirect
          to={{
            pathname: "/home/needs-review",
            state: { from: location },
          }}
        />
      </Route>
    </Switch>
  );
};

export default Routes;
