import React, { useState } from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'
import EducationalMessage from './Education'
import Reminders from './Reminders'
import MedicationReminder from './MedicationReminder'
import CachedReports from './CachedReports'

const HomePage = () => {

    return (
        <Body>
            <EducationalMessage />
            <Greeting />
            <ActionBox />
            <CachedReports />
            <Progress />
            <MedicationReminder />
            <Reminders />
            <Alerts />
        </Body>
    )

};

const Body = styled.div`

padding-top: 1em;

width: 100%;
min-height: 90vh;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
background-color: ${Colors.backgroundGray}

`

export default HomePage;

