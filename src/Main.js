import React, { useEffect } from 'react';
import PatientHome from './Patient/';
import Login from './Login';
import PractitionerHome from './Practitioner'
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Colors from './Basics/Colors';
import useStores from './Basics/UseStores';
import Boundry from './Basics/ErrorBoundary'
import CheckAuthorization from './Basics/HandleAuthorizationError'
import SWWrapper from './ServiceWorkerWrapper'
import { useMatomo } from '@datapunt/matomo-tracker-react'
import Alerts from './Components/Alerts'
import PushHandler from './Basics/PushNotificationHandler';

const theme = createMuiTheme({

  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "1.25em"
    },
  },
  palette: {
    primary: {
      main: Colors.buttonBlue,
      error: Colors.warningRed
    },
    secondary: {
      main: "#FFFFFF"
    },
    badge:{
      main: Colors.warningRed
    },
    error:{
      main: "#EB5757"
    }
  }
});

const UserHome = observer(() => {
  const { loginStore, patientStore,practitionerStore } = useStores();

  if (loginStore.userType === "Patient") {
    patientStore.initalize()
    return <PatientHome />
  }

  if (loginStore.userType === "Practitioner"){
    practitionerStore.initalize();
    return <PractitionerHome />
  }
 
  return <Login />
})

const Main = observer(() => {
  const { uiStore, loginStore } = useStores();
  const {pushInstruction,trackPageView} = useMatomo();

  let versionNumber = process.env.REACT_APP_GITHUB_VERSION || "Unknown";

  useEffect(() => {
    initalizeApplicationState();
    listenForConnectivityChanges();
    pushInstruction('setCustomVariable',1,"appVersion",versionNumber,"visit");
    pushInstruction('enableJSErrorTracking')

  }, [])

  useEffect(()=>{
    trackPageView();
  },[uiStore.fullPath])

  const listenForConnectivityChanges = () => {
    window.addEventListener('online', () => {
      uiStore.offline = false;
    });

    window.addEventListener('offline', () => {
      uiStore.offline = true;
    });

  }

  const initalizeApplicationState = () => {
    uiStore.initalizeLocale();
  }

  return (
    <SWWrapper>
      <Boundry>
        <PushHandler>
        <CheckAuthorization />
          <ThemeProvider theme={theme}>
            {loginStore && loginStore.isLoggedIn ? <UserHome /> : <Login />}
            <Alerts />
          </ThemeProvider>
        </PushHandler>
      </Boundry>
    </SWWrapper>
  )

})

export default Main;