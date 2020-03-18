import React from 'react';
import styled from 'styled-components';
import ProgressGraph from './ProgressGraph';
import LogPrompt from './LogPrompt';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';

const HomePage = () => {

    return (

        <Body>
            <ActionBox />
            <ProgressGraph />
            <Alerts />
            {/*<LogPrompt />*/}
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
background-color: ${Colors.lightgray}

`

export default HomePage;

