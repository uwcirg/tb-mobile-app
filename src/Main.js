import React from 'react';
import PatientHome from './PatientHome';
import Login from './Login'; 

import PractitionerHome from './Practitioner'

import { ThemeProvider, styled} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Translation, withTranslation} from "react-i18next";

import ImageUploadFlow from './Login/TestImageFlow'
import { computed } from 'mobx';

const theme = createMuiTheme({

    typography:{
      fontFamily: "'Roboto', sans-serif"

    },
    palette: {
      primary: {
          main: "#1f4a94"
      },
      secondary:{
        main: "#FFFFFF"
      }
    }
  }); 

@withTranslation()
@inject('uiStore','patientStore','practitionerStore')
@observer
export default class Main extends React.Component{

  @computed get isLoggedIn(){
   return this.props.patientStore.isLoggedIn || this.props.practitionerStore.isLoggedIn
  }

  @computed get test(){
    if(this.props.patientStore.isLoggedIn){
      return (<PatientHome />)
    }else if( this.props.practitionerStore.isLoggedIn){
      return (<PractitionerHome />)
    }

  }

  componentDidMount() {

    this.listenForConnectivityChanges();

    /*@TODO move this code to patientStore to simplify
      Just move all of the logic from initalizeApplicationState to that file
    
    if( this.props.patientStore.isLoggedIn){
      this.props.patientStore.getPatientInformation();
    }
    */

  }

    handleTest = () => {
        if( this.props.uiStore.language == "en"){
          this.props.uiStore.language = "es";
        }else{
          this.props.uiStore.language = "en";
        }
    }

  handleBack = () =>{
      this.props.uiStore.isLoggedIn = false;
      this.props.uiStore.userType = ""
  }

    render(){

      let Application = this.initalizeApplicationState();

        return(
        <div>
        <ThemeProvider theme={theme}>
                {this.isLoggedIn ? this.test : <Login />}
        </ThemeProvider>
        </div>
        )
    }

    listenForConnectivityChanges(){
      window.addEventListener('online', () => {
        this.props.uiStore.offline = false;
      });
  
      window.addEventListener('offline', () => {
        this.props.uiStore.offline = true;
      });
    }

    initalizeApplicationState(){
      //Get Notificaiton Authenticaiton key from Server
      //this.props.patientStore.getVapidKeyFromServerAndStoreLocally();      
      
      const userType = localStorage.getItem("user.type");

      if(userType === "Patient"){
        this.props.patientStore.initalize();

      }else if( userType === "Practitioner"){
        this.props.practitionerStore.initalize();
      }



      
      /*
      const token =  localStorage.getItem("user.token")
      const id = localStorage.getItem("user.id")
      const uiState = localStorage.getItem("uiState");
      *'/


      /*
      //Initalize User Identifiers
      this.props.patientStore.initalize().then( (userAuthorization) => {
        this.props.uiStore.isLoggedIn = true;
      })
  
      
      this.props.uiStore.initalize(JSON.parse(uiState));
    */
    }
}