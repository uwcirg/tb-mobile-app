import React from 'react';
import App from './Screens/App';
import Login from './Screens/Login'; 
import Drawer from './Navigation/Drawer'
import { ThemeProvider, styled} from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import TopBar from './Navigation/TopBar';

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

    render(){
        return(
        <div className="App">
        <ThemeProvider theme={theme}>
            <TopBar />
            <Drawer />
                {this.props.participantStore.isLoggedIn ? <App /> : <Login props={{approveLogin:this.approveLogin }} />}
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