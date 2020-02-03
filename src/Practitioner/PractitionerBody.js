import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import {observer} from 'mobx-react'
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';

import AddPatientPrompt from './AddPatientPrompt'
import AddPatientFlow from './AddPatientFlow'



const PractitionerBody = observer(() => {

    const {practitionerStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    return(
        <Body>
            {!practitionerStore.onNewPatientFlow ? <AddPatientFlow /> : <AddPatientPrompt />}
        </Body>
    )
 
});


const Body = styled.div`
margin-top: 10vh;
width: 100%;
height: 90vh;
background-color: ${Colors.lightgray};

display: flex;
justify-content: center;
align-content: center;
align-items: center;

`

export default PractitionerBody;
