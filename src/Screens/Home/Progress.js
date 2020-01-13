import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ProgressGraph from './ProgressGraph';
import LogPrompt from './LogPrompt';

const Progress = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    const { t, i18n } = useTranslation('translation');

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
height: ${window.innerHeight-120};
width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
margin: 60px 0 60px 0;

`

const Greeting = styled.div`

margin-top: 2em;

 h1, h2{
     margin: 0;
     padding: 0;
     text-align: center;
     font-family: 'Roboto',sans-serif;
 }

 h1{
     font-weight: medium;
     font-size: 1.25em;
 }

 h2{
     font-weight: 100;
     font-size: 1em;
     width: 80%;
     margin: 1em auto 0 auto;
 }

`

export default Progress;

