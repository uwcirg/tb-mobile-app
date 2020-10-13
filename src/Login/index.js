import React, { useEffect, useState } from 'react'
import LoginRouter from './LoginRouter';
import Alert from '../Basics/Alert';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';


const Login = observer(() => {

  const { t, i18n } = useTranslation('translation');
  const { loginStore } = useStores();
  const [error,setError] = useState(false);

  const errorText = () => {
    if (loginStore.error == 422) {
      return t("errors.login.identifier")
    } else if (loginStore.error == 401) {
      return t("errors.login.password")
    } else {
      return t("errors.login.other")
    }
  }

  return (
    <>
      <LoginRouter />
      {error && <Jimmy />}
      {loginStore.error != 0 && <Alert open text={errorText()} onClose={loginStore.clearError} />}
      <button onClick={()=>{setError(!error)}}>Error Thrower</button>
    </>

  )

});

export default Login;