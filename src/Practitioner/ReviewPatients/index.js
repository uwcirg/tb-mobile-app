import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import ReviewPatientTabs from "./Tabs";
import StickyTopBar from "../../Components/Shared/StickyTopBar";
import ReviewPhoto from "./ReviewPhoto";
import ListOfPatients from "./ListOfPatients";
import MessagePatient from "./MessagePatient";
import AllPatientsList from "./AllPatientsList";
import WrappedReportingPopover from "./WrappedReportingPopover";
import TopBar from "./HomeTopBar";

const PractitionerHome = () => {
  const location = useLocation();

  const getTabLocation = () => {
    return location.pathname === "/home/reviewed"
      ? 1
      : location.pathname === "/home/all"
      ? 2
      : 0;
  };

  const tabValue = getTabLocation();

  return (
    <div style={{ maxHeight: "100vh", overflowY: "scroll" }}>
      <Route path="*/:patientId/reports">
        <WrappedReportingPopover />
      </Route>
      <ReviewPhoto />
      <MessagePatient />
      <StickyTopBar>
        <TopBar />
        <ReviewPatientTabs value={tabValue} />
      </StickyTopBar>
      <Switch>
        <Route path="/home/all">
          <AllPatientsList />
        </Route>
        <Route path={"/"}>
          <ListOfPatients tabValue={tabValue} />
        </Route>
      </Switch>
    </div>
  );
};

export default PractitionerHome;
