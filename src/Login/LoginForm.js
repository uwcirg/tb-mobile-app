import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import {Container,Card, IdentifierInput} from './StyledInputs'
import Alert from '../Basics/Alert';
import Button from '@material-ui/core/Button';

import {PasswordInput} from './StyledInputs'

const USER_TYPES = ["Patient","Practitioner","Administrator"];

const LoginForm = observer((props) => {

    const {patientStore,loginStore,practitionerStore} = useStores();
  
    let updatePassword = (e) => {
      loginStore.password = e.target.value;
    }
  
    let updateIdentifier = (e) => {
      loginStore.identifier = e.target.value;
    }

    //TODO refactor polymorphicly
    let handleLogin = () => {
      loginStore.login(props.loginType).then( res => {
        switch(res) {
          case USER_TYPES[2]:
            console.log("Future admin login flow")
            break;
          case USER_TYPES[1]:
            practitionerStore.initalize();
            break;
          case USER_TYPES[0]:
            patientStore.initalize();
          break;
          default:
            console.log("Invalid Login")
        }
      });
  
    }

    const errorText = () => {
      if(loginStore.error == 422){
        return "User does not exist"
      }else if(loginStore.error == 401){
        return "Wrong Password"
      }else{
        return "Internal Server Error"
      }
    }
  
    const isPatient = props.loginType == "Patient";
  
    return (
      <Container>
        <Card>
        <form onSubmit={(e) => {e.preventDefault()}}>
        <IdentifierInput defaultValue={isPatient? "Phone Number": "Email"} updateIdentifier={updateIdentifier} />
          <br />
        <PasswordInput updatePassword={updatePassword} />
          <br />
          <Button id="login" fullWidth onClick={handleLogin} variant="contained" color={"primary"} > Log in</Button>
          </form>
          </Card>
          <BottomLinks>
            <a onClick={props.handleActivate}>Activate New Account</a>
            <a>Forgot Password</a>
          </BottomLinks>
          {loginStore.error && <Alert open text={errorText()} onClose={loginStore.clearError} />}
      </Container>
    );
  });


const BottomLinks = styled.div`
margin-top: 3em;
a{
    margin-top: 1.25em;
    text-align: center;
    display: block;
    width: 100%;
    color: #89b3f9;
  }

`

export default LoginForm;