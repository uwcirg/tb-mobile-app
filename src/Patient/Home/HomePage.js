import React, {useState} from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'
import EducationalMessage from './EducationalMessage'
import Reminders from './Reminders'
import Button from '@material-ui/core/Button';

const HomePage = () => {
    const [educationVisibility,setEducationVisibility ] = useState(true)

    const toggleEducationVisibility = () => {
        setEducationVisibility(!educationVisibility);
    }

    return (
        <Body>
            <EducationalMessage handleClickAway={toggleEducationVisibility} visible={educationVisibility} />
            <Greeting />
            <ActionBox />
            <Progress />
            <Reminders />
            <Button onClick={toggleEducationVisibility}> Test Education</Button>
           {/*<Alerts />*/} 
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

