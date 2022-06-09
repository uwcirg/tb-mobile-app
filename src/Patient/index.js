import React, { useEffect } from 'react';
import BottomBar from './Navigation/BottomBar';
import { observer } from 'mobx-react';
import Home from './Home'
import Info from './Information/'
import Messaging from '../Messaging';
import Progress from './Progress';
import TopBar from './Navigation/TopBar';
import TopMenu from './Navigation/SettingsDrawer';
import Intro from './Walkthrough/';
import useStores from '../Basics/UseStores';
import Onboarding from './Onboarding';
import Colors from '../Basics/Colors';
import { useMatomo } from '@datapunt/matomo-tracker-react'
import ErrorListener from './ErrorListener';
import ForcePasswordChange from './ForcePasswordChange';
import EducationalMessage from './Home/Education';
import { usePageVisibility } from '../Hooks/PageVisibility';
import UpdateContactTracing from './HouseholdTesting';
import MissedPhotoFlow from './ReportingFlows/AltPhotoFlows';
import PushActionReportingFlow from './ReportingFlows/PushActionReportingFlow';
import Box from '@material-ui/core/Box';
import RedoPhotoFlow from './ReportingFlows/AltPhotoFlows/RedoPhotoFlow';
import TestSteps from './Information/TestInstructions';
import isIndonesiaPilot from '../Utility/check-indonesia-flag';
import AddApointment from '../Components/Shared/Appointments/AddAppointment/';

const PatientHome = observer(() => {

  const { patientUIStore, patientStore, uiStore, dailyReportStore } = useStores();
  const tabs = [<Home />, <Progress />, <Messaging />, <Info />];
  const routeTab = tabs[patientUIStore.tabNumber]
  const { trackPageView, pushInstruction } = useMatomo();
  const isVisible = usePageVisibility();

  // When tab is changed, make sure that we scroll to the top so user does not get lost
  // Track page view in Matomo
  useEffect(() => {
    const TEXT_OPTIONS = ['Home', 'Progress', 'Messaging', 'Information'];
    trackPageView({ documentTitle: TEXT_OPTIONS[patientUIStore.tabNumber] })
    window.scrollTo(0, 0)
  }, [patientUIStore.tabNumber])

  useEffect(() => {
    if (patientStore.status === "Pending") patientUIStore.goToOnboarding();
  }, [patientStore.status])

  useEffect(() => {
    if (patientStore.userID) {
      pushInstruction('setUserId', `P${patientStore.userID}`);
    }
  }, [patientStore.userID])

  //Upload old reports when a patient comes back online
  useEffect(() => {
    if (!uiStore.offline && dailyReportStore.numberOfflineReports > 0) {
      dailyReportStore.syncOfflineReports().then(() => {
        patientStore.getReports();
      })
    }
  }, [uiStore.offline, dailyReportStore.numberOfflineReports])

  useEffect(() => {
    if (isVisible) {
      let displayMode = 'browser';
      const mqStandAlone = '(display-mode: standalone)';
      if (navigator.standalone || window.matchMedia(mqStandAlone).matches) {
        displayMode = 'standalone';
      }
      pushInstruction('setCustomVariable', 2, "clientLaunchType", displayMode, "visit");
    }
  }, [isVisible])

  if (patientStore.hasForcedPasswordChange) {
    return <ForcePasswordChange />
  }

  if (patientStore.status === "Pending") {
    return <Onboarding />
  }

  if (uiStore.pathname.startsWith("/contact-tracing")) {
    return <UpdateContactTracing />
  }

  if (uiStore.pathname.startsWith("/missed-photo")) {
    return <MissedPhotoFlow />
  }

  if(uiStore.pathname.startsWith("/test-instructions")){
    return <div>
      <TestSteps />
    </div>
  }

  if (uiStore.pathname.startsWith("/redo-photo")) {
    return <RedoPhotoFlow />
  }

  if (uiStore.pathname.startsWith("/quick-report")) {
    return <PushActionReportingFlow />
  }

  if(uiStore.pathname.startsWith("/add-appointment")){
    return <AddApointment patientId={patientStore.userID} />
  }

  return (
    <div className="main-screen" style={{ backgroundColor: `${Colors.white}`, height: "100vh", overflowY: patientUIStore.onSettings ? "hidden" : "scroll" }}>
      <ErrorListener />
      <div>
        <TopBar />
        <Box height="60px" />
      </div>
      {!isIndonesiaPilot() && <EducationalMessage />}
      {patientUIStore.onWalkthrough && <Intro />}
      <TopMenu />
      <div style={{ paddingBottom: "60px" }}>
        {routeTab}
      </div>
      {!patientUIStore.onReportFlow && <BottomBar />}
    </div >
  );
}
);


export default PatientHome;