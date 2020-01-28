import React, { Component, useEffect } from 'react';
import './App.css';
import BottomBar from './Navigation/BottomBar'
import { inject, observer } from 'mobx-react';

import Home from './Screens/Home'
import Info from './Screens/Info'

import Messaging from './Screens/Messaging/';

import TopBar from './Navigation/TopBar';
import Drawer from './Navigation/Drawer';

@inject("uiStore")
@observer
class App extends Component {

  render(){

    const tabs = [<Home />,<Messaging />  ,<Info />]

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

export default App;