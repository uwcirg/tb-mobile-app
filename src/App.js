import React, { Component, useEffect } from 'react';
import './App.css';
import ClCamera from './ImageCapture/ClCamera'
import BottomBar from './Navigation/BottomBar'
import UploadedCard from './ImageCapture/UploadedCard'
import { inject, observer } from 'mobx-react';

import Home from './Screens/Home'
import Info from './Screens/Info'

import Messaging from './Screens/Messaging/';

import TopBar from './Navigation/TopBar';
import Drawer from './Navigation/Drawer';

@inject("uiStore")
@observer
class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageCaptureAvailable: true,
      hasUploaded: false,
      isUploading: false,
      name: "Kyle",
      number: 1,
      updateUser: this.updateUser
    }
  }

  pushImage = (image) => {

    let oldImages = this.state.images;
    oldImages.push(image)

    this.setState({
      images: oldImages
    })

  }

  hasUploaded = () => {
    this.setState({
      hasUploaded: true,
      isUploading: false
    })
  }

  isUploading = () => {
    this.setState({
      isUploading: true
    })
  }

  setImages = (images) => {
    this.setState({
      images: images
    })
  }

  clearLoadCycle = () => {
    this.setState({
      hasUploaded: false,
      isUploading: false
    })
  }

  updateUser = (name,number) => {
    this.setState({
      name: name,
      number: number
    })
  }

  render(){

    const uploadedCard = <UploadedCard title="Photo Uploaded" buttonText="Okay" color="#58a45c" action={this.clearLoadCycle}/>
    const uploadingCard = <UploadedCard title="Photo Uploading" color="#ff5c62"/>

    //<ClCamera isUploading={this.isUploading} hasUploaded={this.hasUploaded} setImages={this.setImages} />

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