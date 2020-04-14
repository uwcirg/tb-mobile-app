import React, { Component, useEffect } from 'react';
import BottomBar from './Navigation/BottomBar';
import { inject, observer } from 'mobx-react';
import Home from './Home'
import Info from './Info'
import Messaging from '../Messaging';
import Progress from './Progress';
import TopBar from './Navigation/TopBar';
import TopMenu from './Navigation/TopMenu';
import Intro from './Intro';
import useStores from '../Basics/UseStores';

const PatientHome = observer((props) => {

    const {uiStore} = useStores();
    const tabs = [<Home />, <Progress />, <Messaging />  ,<Info />]

    return (
      <div className="main-screen">
        <TopBar />
        {uiStore.introEnabled && <Intro /> }
        <TopMenu />
          <div style={{paddingTop: "60px", paddingBottom:"60px"}}>
            {tabs[uiStore.activeTab]}
          </div>
        <BottomBar />
      </div>
    );
  }
);


export default PatientHome;