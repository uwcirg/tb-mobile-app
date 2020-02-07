import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import {Container,Card, IdentifierInput} from './StyledInputs'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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

    //Todo refactor polymorphicly
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
            console.log("Invalid Login Type")
        }
      });
  
    }
  
    const isPatient = props.loginType == "Patient";
  
    return (
      <Container>
        <Card>
        <IdentifierInput defaultValue={isPatient? "Phone Number": "Email"} updateIdentifier={updateIdentifier} />
          <br />
        <PasswordInput updatePassword={updatePassword} />
          <br />
          <Button fullWidth onClick={handleLogin} variant="contained" color={"primary"} > Log in</Button>
          </Card>
          <BottomLinks>
            <a onClick={props.handleActivate}>Activate New Account</a>
            <a>Forgot Password</a>
          </BottomLinks>
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