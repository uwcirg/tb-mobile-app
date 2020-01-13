import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';

const phoneNumberText = "Phone Number"
const passwordText = "Password"

const Login = inject("patientStore","uiStore", "coordinatorStore")(observer(({ patientStore,uiStore,coordinatorStore, props }) => {

  let updatePassword = (e) => {
    patientStore.loginPassword = e.target.value;
    coordinatorStore.loginEmail = e.target.value;
  }

  let updateIdentifier = (e) => {

    if( uiStore.userType == 0){
      patientStore.loginPhoneNumber = e.target.value;
    }else{
      coordinatorStore.loginEmail = e.target.value;
    }
  }

  let handleLogin = () => {
    patientStore.login();
  }

  const Container = styled.div`

  background-color: ${uiStore.userType != 0 ? "gray" : "#23509d"};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  color: white;

  label{
    visibility: hidden;
  }

  `

  return (
    <Container>
      <Title>
      <img src="icon.svg"></img>
      <h1> Asistiante de Tratamiento</h1>
      </Title>
      <Card>
          <InputLabel htmlFor="input-with-icon-adornment">{ uiStore.userType == 0 ?  "Phone Number" : "Email"}</InputLabel>
          <Input
            defaultValue={ uiStore.userType == 0 ?  "Phone Number" : "Email"}
            onChange={(e) => { updateIdentifier(e) }}
            onClick={(e) => { 
              if(e.target.value == phoneNumberText){
                e.target.value = ""
              }}}
            id="input-with-icon-adornment"
            disableUnderline
            fullWidth
          />

        <br />

          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            disableUnderline
            defaultValue={passwordText}
            onChange={(e) => { updatePassword(e) }}
            onClick={(e) => { 
              if(e.target.value == passwordText){
                e.target.value = ""
              }}}
            type="password"
            id="input-with-icon-adornment"
            fullWidth
          />
          <a>Forgot Password?</a>
        <br />
        <Button fullWidth onClick={handleLogin} variant="contained" color={"primary"} > Log in</Button>
        <a onClick={ () => { if(uiStore.userType == 0){uiStore.userType = 1 }else uiStore.userType = 0}}>Treatment Coordinator? Login Here</a>
        </Card>
    </Container>
  );
}));

const Title = styled.div`

display: flex;
justify-content: center;
flex-direction: column;
align-conent: flex-end;
flex-grow: 1;
height: 30vh;

img{
  height: 10vh;
}

h1{
  width: 85%;
  margin: auto;
}
`
const Card = styled.div`
  margin: auto;
  width: 80%;
  color: white;
  flex-grow: 2;

  a{
    margin-top: 1em;
    text-align: right;
    display: block;
    width: 100%;
  }

  input{
    background-color: #0e3782;
    border-radius: 8px;
    padding: 1em;
    color: white;
  }

  button{
    background-color: #89b3f9;
    color: #041a3e;
    border-radius: 8px;
    padding: 1em;
  }
`
export default Login;