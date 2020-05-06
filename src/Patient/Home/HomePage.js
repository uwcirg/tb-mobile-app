import React from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'

const HomePage = () => {

    return (

        <Body>
            <Greeting />
            <ActionBox />
            <Progress />
            <Alerts />
            <p>Version 0.9.1</p>
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

