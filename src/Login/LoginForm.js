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
          <br />
          {onActivation ? <Center><CodeInput onChange={handleCodeInput} id="activationCode" fields={5} /></Center> : <PasswordInput updatePassword={updatePassword} />}
          <br />
          <Button id="login" fullWidth onClick={loginStore.submit} variant="contained" color={"primary"} >{onActivation ? t("login.activate") : t("login.logIn")}</Button>
        </form>
      </Card>
      <BottomLinks>
        <ButtonBase style={{ fontSize: "1em" }} onClick={toggleActivate}>{onActivation ? t("login.haveAccount") : t("login.activateAccount")}</ButtonBase>
        <ButtonBase style={{ fontSize: "1em" }} onClick={loginStore.goToForgotPassword}>{t("login.forgotPassword")}</ButtonBase>
      </BottomLinks>

    </Container>
  );
});

const BottomLinks = styled.div`
margin: 3em 0 3em 0;
width: 100%;
display: flex;
flex-direction: column;
align-content: center;

button{
    margin-top: 1.25em;
    text-align: center;
    display: block;
    color: #89b3f9;
  }

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