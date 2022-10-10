import React from "react";
import { observer } from "mobx-react";
import useStores from "../Basics/UseStores";
import ReactCodeInput from "react-code-input";
import styled from "styled-components";
import { ActivationForm, Card } from "./StyledInputs";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
const identifierTextOptions = ["Phone Number", "Email"];

const ActivateForm = observer(() => {
  const { patientStore, loginStore, practitionerStore } = useStores();

  const handleInput = (event) => {
    loginStore.activationBody[event.target.id] = event.target.value;
  };

  const handleCodeInput = (change) => {
    loginStore.activationBody.activationCode = change;
  };

  const handleContinue = () => {
    loginStore.verifyActivationCode();
  };

  return (
    <ActivationForm>
      <Card>
        <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
        <Input
          onClick={(e) => {
            if (identifierTextOptions.includes(e.target.value)) {
              e.target.value = "";
            }
          }}
          defaultValue={"Phone Number"}
          id="phoneNumber"
          disableUnderline
          fullWidth
          onChange={handleInput}
        />
      </Card>
      <InputLabel htmlFor="activate-code">Activation Code</InputLabel>
      <CodeInput onChange={handleCodeInput} id="activationCode" fields={5} />
      <Button
        fullWidth
        onClick={handleContinue}
        variant="contained"
        color={"primary"}
      >
        Continue
      </Button>
    </ActivationForm>
  );
});

const CodeInput = styled(ReactCodeInput)`
  margin: auto;

  input {
    width: 6vw;
    height: 6vw;
    margin: 1vw;
    font-size: 1.5em;
    border-radius: 5px;
    border: none;
    padding: 0.5em;
    text-align: center;
  }
`;

export default ActivateForm;
