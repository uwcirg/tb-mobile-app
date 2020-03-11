import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { DateTime } from 'luxon'
import SymptomsList from './SymptomsList.js'
import SimpleButton from '../../Basics/SimpleButton'
import styled from 'styled-components';
import InteractionCard from '../Home/InteractionCard.js';
import useStores from '../../Basics/UseStores.js';

const ReportSymptoms = observer((props) => {

    const {uiStore,patientStore} = useStores();
    const display = DateTime.fromISO(patientStore.medicationTime).toLocaleString(DateTime.TIME_WITH_SHORT_OFFSET);

    patientStore.report.headerText = "Did you have any symptoms?"

    return (
        <Container>
            <InteractionCard upperText="Common Symptoms">
                <SymptomsList />
            </InteractionCard>

            <InteractionCard upperText="Severe Symptoms">
                <SymptomsList severe />
            </InteractionCard>
            <SimpleButton alignRight onClick={props.advance}>
                Report {patientStore.selectedSymptoms.length === 0 ? "No" : patientStore.selectedSymptoms.length} Symptoms
            </SimpleButton>
        </Container>)
});

const Container = styled.div`
button{
    margin: 2em;
}
`

export default ReportSymptoms;
