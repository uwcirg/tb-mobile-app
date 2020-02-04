import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Colors from '../Basics/Colors'
import useStores from '../Basics/UseStores';
import ReactCodeInput from 'react-code-input'

const USER_TYPES = ["Patient","Practitioner","Administrator"];
const identifierTextOptions = ["Phone Number","Email"];
const passwordText = "********"

const Login = (props) => {

  const [onActivation, setActivation] = useState(false);

  return(
    <div>
    { !onActivation ? <ActivateForm /> : <LoginForm handleActivate={ () => {setActivation(true)}} {...props} /> }
  </div>
  )
}

const LoginForm = observer((props) => {

  const {patientStore,loginStore,practitionerStore} = useStores();

  let updatePassword = (e) => {
    loginStore.password = e.target.value;
  }

  let updateIdentifier = (e) => {
    loginStore.identifier = e.target.value;
  }

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
          <InputLabel htmlFor="input-with-icon-adornment">{ isPatient?  "Phone Number" : "Email"}</InputLabel>
          <Input
            defaultValue={ isPatient?  "Phone Number" : "Email"}
            onChange={(e) => { updateIdentifier(e) }}
            onClick={(e) => { 
              if(identifierTextOptions.includes(e.target.value)){
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


const ActivateForm = observer(() => {

  const {patientStore,loginStore,practitionerStore} = useStores();

  const handleContinue= () => {
    console.log("Continue")
  }

  return(
    <Activation>
      <Card>
          <InputLabel htmlFor="activate-phone-number">Phone Number</InputLabel>
          <Input
            onClick={(e) => { 
              if(identifierTextOptions.includes(e.target.value)){
                e.target.value = ""
              }}}
            defaultValue={"Phone Number"}
            id="activate-phone-number"
            disableUnderline
            fullWidth
          />
          </Card>
          <InputLabel htmlFor="activate-code">Activation Code</InputLabel>
          <CodeInput id="activate-code"  fields={5} />
          <Button fullWidth onClick={handleContinue} variant="contained" color={"primary"} >Continue</Button>
    </Activation>

  )
});

const CodeInput = styled(ReactCodeInput)`
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

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
color:  "white";
label{
  visibility: hidden;
}
`

const Activation = styled(Container)`

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
const Card = styled.div`
  margin: auto;
  width: 80%;
  color: white;
  flex-grow: 2;

  input{
    background-color: ${Colors.lightBlue};
    border-radius: 8px;
    padding: 1em;
    color: white;
  }

  button{
    margin-top: 1.5em;
    background-color: #89b3f9;
    color: #041a3e;
    border-radius: 8px;
    padding: 1em;
  }
`
export default Login;