import React, { useEffect } from 'react'
import LoginRouter from './LoginRouter';
import Alert from '../Basics/Alert';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';

const Login = observer(() => {

  const { loginStore, uiStore,routingStore } = useStores();

  const errorText = () => {
    if (loginStore.error == 422) {
      return "Incorrect Phone Number / Email"
    } else if (loginStore.error == 401) {
      return "Incorrect Password"
    } else {
      return "Internal Server Error"
    }
  }

  return (
    <>
      <LoginRouter />
      {loginStore.error != 0 && <Alert open text={errorText()} onClose={loginStore.clearError} />}
    </>

  )

});

export default Login;