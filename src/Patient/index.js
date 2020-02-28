import React, { Component, useEffect } from 'react';
import BottomBar from '../Navigation/BottomBar'
import { inject, observer } from 'mobx-react';

import Home from './Home'
import Info from './Info'

import Messaging from '../Messaging';

import Progress from './Progress';

import TopBar from '../Navigation/TopBar';
import Drawer from '../Navigation/Drawer';

@inject("uiStore")
@observer
class PatientHome extends Component {

  render(){

    const tabs = [<Home />, <Progress />, <Messaging />  ,<Info />]

    return (
      <div className="main-screen">
        <TopBar />
        <Drawer />
        {tabs[this.props.uiStore.activeTab]}
        <BottomBar />
      </div>
    );
  }
}

export default PatientHome;