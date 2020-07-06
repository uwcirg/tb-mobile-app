import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ActivateForm from './ActivationForm';
import ActivationSuccess from './ActivationSuccess';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'

const Login = observer((props) => {

  const { loginStore, patientStore } = useStores();

  if (props.loginType == "Test") {
    patientStore.isLoggedIn = true;
    patientStore.givenName = "Test User";
  }


  return (
    <div>
      <LoginForm {...props} />
    </div>
  )
});

export default Login;