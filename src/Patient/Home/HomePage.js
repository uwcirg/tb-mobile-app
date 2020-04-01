import React from 'react';
import styled from 'styled-components';
import ProgressGraph from './ProgressGraph';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'

const HomePage = () => {

    return (

        <Body>
            <Greeting />
            <ActionBox />
            <ProgressGraph />
            <Alerts />
            <p>Treatment Companion Version 04.1.20.12:20</p>
        </Body>
    )

};

const Body = styled.div`

padding-top: 1em;

width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: ${Colors.backgroundGray}

`

export default HomePage;

