import React from 'react';
import styled from 'styled-components';
import Colors from '../Basics/Colors';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { useTranslation } from 'react-i18next';

const PasswordInput = (props) => {

  const { t } = useTranslation('translation');
  return (
    <div>
      <InputLabel htmlFor="input-with-icon-adornment">{props.confirmation ? "Password Confirmation" : "Password"}</InputLabel>
      <Input
        autoComplete="password"
        disableUnderline
        placeholder={t('login.password')}
        onChange={(e) => { props.updatePassword(e) }}
        type="password"
        id="password"
        fullWidth
      />
    </div>)
}

const IdentifierInput = (props) => {
  return (
    <div>
      <InputLabel htmlFor="input-with-icon-adornment">{props.defaultValue}</InputLabel>
      <Input
        inputProps={props.isNumeric && {inputMode: 'numeric'}}
        autoComplete="username"
        placeholder={props.defaultValue}
        // defaultValue={ props.defaultValue}
        onChange={(e) => { props.updateIdentifier(e) }}
        id="identifier"
        disableUnderline
        fullWidth />
    </div>
  )
}

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
color:  "white";
label{
  visibility: hidden;
}
`
const Card = styled.div`
  margin: auto;
  width: 80%;
  max-width: 300px;
  color: white;
  flex-grow: 2;

  input{
    background-color: ${Colors.lightBlue};
    border-radius: 8px;
    padding: 1em;
    color: white;
  }

  input::placeholder {
      color:white;
      opacity: 80%;
  }
  

  button{
    margin-top: 1.5em;
    background-color: #89b3f9;
    color: #041a3e;
    border-radius: 8px;
    padding: 1em;
  }
`

const ActivationForm = styled(Container)`

label{
  visibility: unset;
  text-align: center;
  margin: 1em;
  color: white;
}

button{
  width: 80%;
  margin: auto;
  margin-top: 2em;
  background-color: #89b3f9;
  color: #041a3e;

}
`

export {
  PasswordInput,
  Container,
  Card,
  ActivationForm,
  IdentifierInput
}