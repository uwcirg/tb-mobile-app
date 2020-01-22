import React from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ClCamera from '../../ImageCapture/ClCamera/oldindex'
import moment from 'moment';
import Button from '@material-ui/core/Button'

import SimpleButton from '../../Basics/SimpleButton';

import TimePicker from 'rc-time-picker';
import './customTimePicker.css';

const Container = styled.div`

display: flex;
flex-direction: column;
justify-content: center;
align-content: center;

h2{
    display: block;
    width: 100vw;
}

`

const NextButton = styled(Button)`

`

const MedicationReporting = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    const { t, i18n } = useTranslation('translation');

    return (<Container> 
        <h2> What time did you take your medication?</h2>
        <TimePicker minuteStep={10} showSecond={false} use12Hours defaultValue={moment() } />
        <SimpleButton >Next</SimpleButton>
        </Container>)

}));

export default MedicationReporting