import React from 'react'
import LoginRouter from './LoginRouter';
import Alert from '../Basics/Alert';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import DemoWarning from './DemoWarning';


const Login = observer(() => {

  const { t } = useTranslation('translation');
  const { loginStore } = useStores();

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
      <DemoWarning />
      <LoginRouter />
      {loginStore.error != 0 && <Alert open text={errorText()} onClose={loginStore.clearError} />}
    </>

  )

});

export default Login;