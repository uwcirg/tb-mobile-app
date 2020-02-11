import React,{useState} from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DateTime } from 'luxon'
import { TimePicker } from "@material-ui/pickers/TimePicker";
import SimpleButton from '../../Basics/SimpleButton';
import BinaryField from '../../Basics/BinaryField';
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import colors from '../../Basics/Colors';

import Fade from '@material-ui/core/Fade';


const ReportMedication = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore }) => {

    const [selectedDate, handleDateChange] = useState(DateTime.local());
    patientStore.medicationTime = selectedDate.toISO();


    const handleNext = () => {
        patientStore.medicationStep = 1;
    }

    const handleDate = (date) => {
        handleDateChange(date);
        patientStore.medicationTime = date.toISO();
    }

    const TimeQuestion = () => {
        return (
        <Fade timeout={1000} in={patientStore.medicationWasReported}>
        <div>
        <h1> What time did you take your medication?</h1>
            <TimePicker
            clearable
            ampm={false}
            value={selectedDate}
            onChange={handleDate}/>

      <ButtonContainer>
      <SimpleButton backgroundColor={colors.gray} onClick={() =>{patientStore.medicationWasReported = false}} aria-label="back">
            <ArrowBackIosIcon  />
            Back
        </SimpleButton>
      <SimpleButton backgroundColor="#76b661" onClick={handleNext} aria-label="next-step">
          Next
        <ArrowForwardIosIcon style={{fontSize:"1em",marginLeft:"1em"}} />
        </SimpleButton>
        </ButtonContainer>
        </div>
        </Fade>)
    }

    const MedicationQuestion = () => {
        return(
        <Fade timeout={1000} in={!patientStore.medicationWasReported}>
            <div>
            <h1>Did you take your medication today?</h1>
            <BinaryField handleYes={() => {patientStore.medicationWasReported = true}} handleNo={() => {console.log("no")}} ></BinaryField>
            </div>
        </Fade>
    )}


    return (
    <Container>
        {patientStore.medicationWasReported ? <TimeQuestion /> : <MedicationQuestion />}
    </Container>)

}));

const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: space-between;

`

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
margin-left: 1em;
width: 90%;
height: 100vh;
position: fixed;
top: 0;

h1{
    display: block;
    width: 100%;
    font-size: 1em;
    font-weight: 600;
    text-align: center;
    padding: 0;
    margin-top: 2em;
}

button{
    margin-top: 4em;
    width: 40%;
}


div > label{
    font-size: 25px;
}

.MuiFormControl-root > div{
    width: 50%;
    margin: auto;
}

div > div > input{
    font-size: 60px;
   
}


`

export default ReportMedication;