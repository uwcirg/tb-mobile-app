import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import {DateTime} from 'luxon'
import SymptomsList from './SymptomsList.js'
import SimpleButton from '../../Basics/SimpleButton'
import styled from 'styled-components';

const ReportSymptoms = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore }) => {

    const display = DateTime.fromISO(patientStore.medicationTime).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);

    const handleNext = () => {
        patientStore.medicationStep += 1;
    }

    return(<Container>
        <SymptomsList /> 
            <SimpleButton onClick={handleNext}>
                Report {patientStore.selectedSymptoms.length === 0 ? "No" : patientStore.selectedSymptoms.length } Symptoms
            </SimpleButton>
        </Container>)
}));

const Container = styled.div`
button{
    margin: 2em;
}
`

export default ReportSymptoms;
