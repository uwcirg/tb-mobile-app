import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import styled from 'styled-components';

import { inject, observer } from 'mobx-react';

const phoneNumberText = "Phone Number"
const passwordText = "Password"

const Login = inject("patientStore")(observer(({ patientStore, props }) => {
  //export default function UploadedCard() {

  let updatePassword = (e) => {
    patientStore.loginPassword = e.target.value;
  }

  let updatePhone = (e) => {
    patientStore.loginPhoneNumber = e.target.value
  }

  let handleLogin = () => {
    patientStore.login();
  }

 

  return (
    <Container>
      <Title>
      <img src="icon.svg"></img>
      <h1> Asistiante de Tratamiento</h1>
      </Title>
      <Card>
          <InputLabel htmlFor="input-with-icon-adornment">Phone Number</InputLabel>
          <Input
            defaultValue={phoneNumberText}
            onChange={(e) => { updatePhone(e) }}
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
        </Card>
    </Container>

  );
}));

const Container = styled.div`

background-color: #23509d;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
color: white;

label{
  visibility: hidden;
}

`

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