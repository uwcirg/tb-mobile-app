import React, { useState, useEffect } from 'react';
import BottomBar from './Navigation/BottomBar';
import {observer} from 'mobx-react';
import Home from './Home'
import Info from './Information'
import Messaging from '../Messaging';
import Progress from './Progress';
import TopBar from './Navigation/TopBar';
import TopMenu from './Navigation/TopMenu';
import Intro from './Intro/';
import useStores from '../Basics/UseStores';
import Onboarding from './Onboarding';
import Colors from '../Basics/Colors';
import { autorun } from 'mobx';

const PatientHome = observer((props) => {

  const { patientUIStore, patientStore, uiStore } = useStores();
  const tabs = [<Home />, <Progress />, <Messaging />, <Info />];
  const routeTab = tabs[patientUIStore.tabNumber]  
  
  //When tab is changed, make sure that we scroll to the top so user doesnt get lost
  useEffect(()=>{
    window.scrollTo(0,0)
  },[patientUIStore.tabNumber])

  useEffect(() => {
    if(patientStore.status === "Pending") patientUIStore.goToOnboarding();
  },[patientStore.status])

  autorun(()=>{
    if(uiStore.offline){
      console.log("CONNECTIONCHANGE OFFLINE")
    }else{
      console.log("CONNECTIONCHANGE ONLINE")
    }
  })

  return (
    <>
    {patientStore.status === "Active" ?
    <div className="main-screen" style={{backgroundColor: `${Colors.white}`,minHeight: "100vh"}}>
      
      <TopBar />
      {patientUIStore.onWalkthrough && <Intro />}
      <TopMenu />
      <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        {routeTab}
      </div>
      <BottomBar />
    </div> 
    : 
    <Onboarding /> }
    </>
  );
}
);


export default PatientHome;