import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressGraph from './ProgressGraph';
import LogPrompt from './LogPrompt';




const Home = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    const { t, i18n } = useTranslation('translation');

    //useEffect(() => messagingStore.getChannels(), []);

    const percentage = 60;
    return (

        <Body>
            <ProgressGraph week={10} />
            <Greeting>
                <h1> {t("home.greeting")} {patientStore.given_name}! 👋</h1>
                <h2> {t("home.purpose")} </h2>
            </Greeting>
            <LogPrompt />
        </Body>
    )

}));

const Body = styled.div`
height: 90vh;
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;

`

const Greeting = styled.div`

margin-top: 2em;

 h1, h2{
     margin: 0;
     padding: 0;
     text-align: center;
     font-family: 'Roboto';
 }

 h1{
     font-weight: medium;
     font-size: 1.25em;
 }

 h2{
     font-weight: 100;
     font-size: 1em;
 }

`

export default Home;