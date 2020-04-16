import React from 'react';
import PatientHome from './Patient/';
import Login from './Login';

import PractitionerHome from './Practitioner'

import { ThemeProvider, styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Translation, withTranslation } from "react-i18next";

import ImageUploadFlow from './Login/TestImageFlow'
import { computed } from 'mobx';
import Colors from './Basics/Colors';

const theme = createMuiTheme({

  typography: {
    fontFamily: "'Roboto', sans-serif"

  },
  palette: {
    primary: {
      main: Colors.buttonBlue
    },
    secondary: {
      main: "#FFFFFF"
    }
  }
});

@withTranslation()
@inject('uiStore', 'patientStore', 'practitionerStore')
@observer
export default class Main extends React.Component {

  @computed get isLoggedIn() {
    return this.props.patientStore.isLoggedIn || this.props.practitionerStore.isLoggedIn
  }

  @computed get userHome() {
    if (this.props.patientStore.isLoggedIn) {
      return (<PatientHome />)
    } else if (this.props.practitionerStore.isLoggedIn) {
      return (<PractitionerHome />)
    }

  }

  componentDidMount() {
    this.initalizeApplicationState();
    this.listenForConnectivityChanges();

    /*@TODO move this code to patientStore to simplify
      Just move all of the logic from initalizeApplicationState to that file
    
    if( this.props.patientStore.isLoggedIn){
      this.props.patientStore.getPatientInformation();
    }
    */

  }

  handleBack = () => {
    this.props.uiStore.isLoggedIn = false;
    this.props.uiStore.userType = ""
  }

  render() {
    return (
      <div>
        <ThemeProvider theme={theme}>
          {this.isLoggedIn ? this.userHome : <Login />}
        </ThemeProvider>
      </div>
    )
  }

  listenForConnectivityChanges() {
    window.addEventListener('online', () => {
      this.props.uiStore.offline = false;
    });

    window.addEventListener('offline', () => {
      this.props.uiStore.offline = true;
    });

    
    window.addEventListener('appinstalled', (evt) => {
      console.log('a2hs installed');
    });

    window.addEventListener('load', () => {
      if (navigator.standalone) {
        console.log('Launched: Installed (iOS)');
      } else if (matchMedia('(display-mode: standalone)').matches) {
        console.log('Launched: Installed');
      } else {
        console.log('Launched: Browser Tab');
      }
    });
  }

  initalizeApplicationState() {
    
    const userType = localStorage.getItem("user.type");
    const uiState = localStorage.getItem("uiState");

    if (userType === "Patient") {
      this.props.patientStore.initalize();

    } else if (userType === "Practitioner") {
      this.props.practitionerStore.initalize();
    }

    this.props.uiStore.initalize(JSON.parse(uiState));

  }
}