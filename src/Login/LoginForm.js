import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import { Container, Card, IdentifierInput } from './StyledInputs'
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'
import { PasswordInput } from './StyledInputs'
import ReactCodeInput from 'react-code-input';
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles } from '@material-ui/core';

const LoginForm = observer((props) => {

  const [onActivation, setOnActivation] = useState(false)
  const { t } = useTranslation('translation');

  const { loginStore } = useStores();

  let updatePassword = (e) => {
    loginStore.password = e.target.value;
  }

  let updateIdentifier = (e) => {
    loginStore.identifier = e.target.value;
  }

  const handleCodeInput = (change) => {
    loginStore.password = change;
  }

  const toggleActivate = () => {
    setOnActivation(!onActivation)
  }

  return (
    <Container>
      <Card>
        <form onSubmit={(e) => { e.preventDefault() }}>
          <IdentifierInput defaultValue={loginStore.isPatient ? t("login.phoneNumber") : t("login.email")} updateIdentifier={updateIdentifier} />
          {onActivation ? <Center><CodeInput onChange={handleCodeInput} id="activationCode" fields={5} /></Center> : <PasswordInput updatePassword={updatePassword} />}
          <Button id="login" fullWidth onClick={loginStore.submit} variant="contained" color={"primary"} >{onActivation ? t("login.activate") : t("login.logIn")}</Button>
        </form>
      </Card>
      <BottomLinks>
      <TextButton onClick={loginStore.goToForgotPassword}>{t("login.forgotPassword")}</TextButton>
        <TextButton onClick={toggleActivate}>{onActivation ? t("login.haveAccount") : t("login.activateAccount")}</TextButton>
      </BottomLinks>

    </Container>
  );
});

const useStyles = makeStyles({
  textButton: {
    fontSize: "1em",
    marginTop: "1.25em",
    textAlign: "center",
    display: "block",
    color: "#88b3f8",
    textDecoration: "underline"
  }
})

const TextButton = (props) => {
  const classes = useStyles();
  return (<ButtonBase className={classes.textButton}  onClick={props.onClick}>{props.children}</ButtonBase>)
}

const BottomLinks = styled.div`
margin: 1em 0;
width: 100%;
display: flex;
flex-direction: column;
align-content: center;

`

const Center = styled.div`
width: 100%;
justify-content: center;
`

const CodeInput = styled(ReactCodeInput)`
    width: 100%;
    display: flex !important;
    justify-content: center;
    margin: auto;
    input{
      width: 6vw;
      height: 6vw;
      margin: 1vw;
      font-size: 1.5em;
      border-radius: 5px;
      border: none;
      padding: .5em;
      text-align: center;
    }
`

export default LoginForm;