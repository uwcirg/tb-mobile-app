import React from 'react';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import ReactCodeInput from 'react-code-input';
import styled from 'styled-components';
import {Container,Card} from './StyledInputs';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
const identifierTextOptions = ["Phone Number","Email"];

const PatientActivation = observer(() => {

    const {patientStore,loginStore} = useStores();
  
    return(
      <div>
        <Card>
            <InputLabel htmlFor="activate-phone-number">Phone Number</InputLabel>
            <Input
              onClick={(e) => { 
                if(identifierTextOptions.includes(e.target.value)){
                  e.target.value = ""
                }}}
              defaultValue={"Phone Number"}
              id="phoneNumber"
              disableUnderline
              fullWidth
              onChange={handleInput}
            />
            </Card>
            <Button fullWidth onClick={handleContinue} variant="contained" color={"primary"} >Continue</Button>
    </div>
    )
  });

export default PatientActivation;