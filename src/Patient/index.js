import React, { useEffect } from 'react';
import BottomBar from './Navigation/BottomBar';
import { observer } from 'mobx-react';
import Home from './Home'
import Info from './Information'
import Messaging from '../Messaging';
import Progress from './Progress';
import TopBar from './Navigation/TopBar';
import TopMenu from './Navigation/TopMenu';
import Intro from './Walkthrough/';
import useStores from '../Basics/UseStores';
import Onboarding from './Onboarding';
import Colors from '../Basics/Colors';
import { useMatomo } from '@datapunt/matomo-tracker-react'
import ErrorListener from './ErrorListener';

const PatientHome = observer((props) => {

  const { patientUIStore, patientStore, uiStore, dailyReportStore } = useStores();
  const tabs = [<Home />, <Progress />, <Messaging />, <Info />];
  const routeTab = tabs[patientUIStore.tabNumber]
  const {trackPageView, pushInstruction } = useMatomo();

  //When tab is changed, make sure that we scroll to the top so user doesnt get lost
  useEffect(() => {
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

  useEffect(()=>{
    const TEXT_OPTIONS = ['Home','Progress', 'Messaging', 'Information'];
    trackPageView({documentTitle: TEXT_OPTIONS[patientUIStore.tabNumber]
  });
  },[patientUIStore.tabNumber])

  useEffect(()=>{
    if (!uiStore.offline && dailyReportStore.numberOfflineReports > 0) {
      dailyReportStore.syncOfflineReports().then( ()=>{
         patientStore.reportStore.getTodaysReport();
      })}
  },[uiStore.offline,dailyReportStore.numberOfflineReports])

  return (
    <>
      {patientStore.status === "Active" ?
        <div className="main-screen" style={{ backgroundColor: `${Colors.white}`, minHeight: "100vh" }}>
          <ErrorListener />
          <TopBar />
          {patientUIStore.onWalkthrough && <Intro />}
          <TopMenu />
          <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
            {routeTab}
          </div>
          <BottomBar />
        </div>
        :
        <Onboarding />}
    </>
  );
}
);


export default PatientHome;