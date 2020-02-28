import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import AddPatientPrompt from './AddPatientPrompt'
import AddPatientFlow from './AddPatientFlow'
import Messages from '../Messaging'

const PractitionerBody = observer(() => {
    const {practitionerStore,routingStore} = useStores();
    const { location, push, goBack } = routingStore;
    const {t, i18n} = useTranslation('translation');

    return(
        <Body>
            {location.pathname === "/messaging" && <Messages />}
            {practitionerStore.onNewPatientFlow ? <AddPatientFlow /> : <AddPatientPrompt />}
        </Body>
    )
});

const Body = styled.div`
margin-top: 10vh;
width: 100%;
height: 90vh;
background-color: ${Colors.lightgray};

display: flex;
flex-direction: column;
justify-content: center;
align-content: center;
align-items: center;

`

export default PractitionerBody;
