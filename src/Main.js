import React, { useEffect } from 'react';
import PatientHome from './Patient/';
import Login from './Login';
import PractitionerHome from './Practitioner'
import AdminHome from './Admin'
import { ThemeProvider, styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Colors from './Basics/Colors';
import useStores from './Basics/UseStores';
import ExpertView from './Expert';
import Boundry from './Basics/ErrorBoundary'
import CheckAuthorization from './Basics/HandleAuthorizationError'
import SWWrapper from './ServiceWorkerWrapper'
import { useMatomo } from '@datapunt/matomo-tracker-react'

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
  const { loginStore, patientStore,practitionerStore,adminStore } = useStores();

  if (loginStore.userType === "Patient") {
    patientStore.initalize()
    return <PatientHome />
  }
  if (loginStore.userType === "Administrator"){
    adminStore.initalize();
    return <AdminHome />
  }
  if (loginStore.userType === "Practitioner"){
    practitionerStore.initalize();
    return <PractitionerHome />
  }
  if (loginStore.userType === "Expert"){
    practitionerStore.initalize();
    return <ExpertView />
  }
  return <Login />
})

const Main = observer(() => {
  const { uiStore, loginStore } = useStores();
  const {pushInstruction} = useMatomo();

  let versionNumber = process.env.REACT_APP_GITHUB_VERSION || "Unknown";

  useEffect(() => {
    initalizeApplicationState();
    listenForConnectivityChanges();
    pushInstruction('setCustomVariable',1,"appVersion",versionNumber,"visit");

  }, [])

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
        <CheckAuthorization />
        <div>
          <ThemeProvider theme={theme}>
            {loginStore && loginStore.isLoggedIn ? <UserHome /> : <Login />}
          </ThemeProvider>
        </div>
      </Boundry>
    </SWWrapper>
  )

})

export default Main;