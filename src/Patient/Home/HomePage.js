import React from 'react';
import styled from 'styled-components';
import ProgressGraph from './ProgressGraph';
import LogPrompt from './LogPrompt';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import WeekCalendar from '../Progress/WeekCalendar';
import Colors from '../../Basics/Colors';

const HomePage = () => {

    return (

        <Body>
            <WeekCalendar />
            <ProgressGraph />
            <ActionBox />
            <Alerts />
            {/*<LogPrompt />*/}
        </Body>
    )

};

const Body = styled.div`

width: 100%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: ${Colors.lightgray}

`

export default HomePage;

