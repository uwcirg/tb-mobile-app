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

const PatientHome = observer((props) => {

  const { uiStore, messagingStore,routingStore } = useStores();
  const { location, push, goBack } = routingStore;
  const splitPath = location.pathname.split("/");
  const strings = ["home","progress","messaging","info"]
  
  return (
    <div className="main-screen">
      <TopBar />
      <Intro />
      <TopMenu />
      <div style={{ paddingTop: "60px", paddingBottom: "60px" }}>
        {RouteTab(splitPath)}
      </div>
      <BottomBar />
    </div>
  );
}
);

const RouteTab = (splitPath) => {

  if( splitPath[1] === "patient"){
    if(splitPath[2] === "home")return <Home />
    if(splitPath[2] === "progress")return <Progress />
    if(splitPath[2] === "messaging")return <Messaging />
    if(splitPath[2] === "information")return <Info />
  }

  return <Home />

}


export default PatientHome;