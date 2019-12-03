import React from 'react';
import App from './Screens/App';
import Login from './Screens/Login'; 
import Drawer from './Navigation/Drawer'
import { ThemeProvider, styled} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import TopBar from './Navigation/TopBar';
import { Translation, withTranslation} from "react-i18next";

const theme = createMuiTheme({
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
@inject('uiStore','participantStore')
@observer
export default class Main extends React.Component{

  componentDidMount() {

    this.initalizeApplicationState();
    this.listenForConnectivityChanges();

    /*@TODO move this code to participantStore to simplify
      Just move all of the logic from initalizeApplicationState to that file
    */
    if( this.props.participantStore.isLoggedIn){
      this.props.participantStore.getParticipantInformation();
    }

  }

    handleTest = () => {
        if( this.props.uiStore.language == "en"){
          this.props.uiStore.language = "es";
        }else{
          this.props.uiStore.language = "en";
        }
    }

    render(){
        return(
        <div className="App">
          {/*
         <Translation>
      {
        (t, { i18n }) => <p>{t('greeting')}</p>
      }
    </Translation>
    */}
        <ThemeProvider theme={theme}>
            <TopBar />
            <Drawer />
            {this.props.t('greeting')}
                {this.props.participantStore.isLoggedIn ? <App /> : <Login props={{approveLogin:this.approveLogin }} />}
                <button onClick={this.handleTest}> test </button>
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
      this.props.participantStore.getVapidKeyFromServerAndStoreLocally();

      //Initalize User Identifiers
      this.props.participantStore.token = localStorage.getItem("user.token")
      this.props.participantStore.uuid = localStorage.getItem("participant.uuid")

    }
}