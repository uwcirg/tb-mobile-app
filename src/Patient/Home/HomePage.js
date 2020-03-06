import React from 'react';
import styled from 'styled-components';
import ProgressGraph from './ProgressGraph';
import LogPrompt from './LogPrompt';
import ActionBox from './ActionBox';
import Alerts from './Alerts';

const HomePage = () => {

    return (

        <Body>
            <ActionBox />
            <ProgressGraph />
            <Alerts />
            <LogPrompt />
        </Body>
    )

};

const Body = styled.div`

width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
margin: 1em 0 60px 0;

`

export default HomePage;

