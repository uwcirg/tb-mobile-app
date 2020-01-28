import React,{useState} from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DateTime } from 'luxon'
import { TimePicker } from "@material-ui/pickers/TimePicker";
import { MuiPickersUtilsProvider } from '@material-ui/pickers/MuiPickersUtilsProvider';
import DateFnsUtils from '@date-io/luxon';
import SimpleButton from '../../Basics/SimpleButton';

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


    return (<Container> 
        <h2> What time did you take your medication?</h2>
     <MuiPickersUtilsProvider utils={DateFnsUtils}>
        
        <TimePicker
        clearable
        ampm={false}
        value={selectedDate}
        onChange={handleDate}
      />
      </MuiPickersUtilsProvider>

        <SimpleButton onClick={handleNext} >Next</SimpleButton>
        </Container>)

}));

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
margin-left: 1em;
width: 80%;

h2{
    display: block;
}

button{
    margin-top: 4em;
    width: 50%;
}


div > label{
    font-size: 25px;
}

div > div > input{
    font-size: 50px;
}

`

export default ReportMedication;