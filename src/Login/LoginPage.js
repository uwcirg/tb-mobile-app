import React, { useState } from 'react';
import LoginForm from './LoginForm';
import ActivateForm from './ActivationForm';
import ActivationSuccess from './ActivationSuccess';
import useStores from '../Basics/UseStores';
import {observer} from 'mobx-react'

const Login = observer((props) => {

  const [onActivation, setActivation] = useState(false);
  const {loginStore} = useStores();

  const Activation = (props) => { 
    return(<div>{props.success ? <ActivationSuccess /> : <ActivateForm />}</div>)
  };

  return(
    <div>
    { onActivation ? <Activation success={loginStore.activationWasSuccessful} /> : <LoginForm handleActivate={ () => {setActivation(true)}} {...props} /> }
  </div>
  )
});

export default Login;