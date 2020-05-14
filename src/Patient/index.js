import React, { useState, useEffect } from 'react';
import BottomBar from './Navigation/BottomBar';
import { inject, observer } from 'mobx-react';
import Home from './Home'
import Info from './Info'
import Messaging from '../Messaging';
import Progress from './Progress';
import TopBar from './Navigation/TopBar';
import TopMenu from './Navigation/TopMenu';
import Intro from './Intro/';
import useStores from '../Basics/UseStores';
import Onboarding from './Onboarding';

const PatientHome = observer((props) => {

  const { patientUIStore } = useStores();
  const tabs = [<Home />, <Progress />, <Messaging />, <Info />];
  const routeTab = tabs[patientUIStore.tabNumber]

  return (
    <div className="main-screen">
        
      {patientUIStore.onOnboarding && <Onboarding />}
      <TopBar />
      <Intro />
      <TopMenu />
      <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        {routeTab}
      </div>
      <BottomBar />
    </div>
  );
}
);


export default PatientHome;