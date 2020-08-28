import React, { useEffect } from 'react';
import PatientHome from './Patient/';
import Login from './Login';

import PractitionerHome from './Practitioner'

import { ThemeProvider, styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import { Translation, withTranslation } from "react-i18next";
import Colors from './Basics/Colors';
import useStores from './Basics/UseStores';
import LoginStore from './DataStores/loginStore';

const theme = createMuiTheme({

  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "1.25em"
    },


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

const UserHome = observer(() => {
  const { loginStore, patientStore,practitionerStore } = useStores();
  if (loginStore.userType === "Patient") {
    patientStore.initalize()
    return <PatientHome />
  }
  if (loginStore.userType === "Administrator") return (<p> ADMIN STUFF HERE YO</p>)
  if (loginStore.userType === "Practitioner"){
    practitionerStore.initalize();
    return <PractitionerHome />
  }
  return <Login />
})

const Main = observer(() => {
  const { uiStore, loginStore } = useStores();

  useEffect(() => {
    initalizeApplicationState();
    listenForConnectivityChanges();
  }, [])

  const handleBack = () => {
    uiStore.isLoggedIn = false;
    uiStore.userType = ""
  }

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
    <div>
      <ThemeProvider theme={theme}>
        {loginStore.isLoggedIn ? <UserHome /> : <Login />}
      </ThemeProvider>
    </div>
  )

})

export default Main;