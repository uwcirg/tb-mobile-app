import React, {useState} from 'react';
import styled from 'styled-components';
import Progress from './Progress';
import ActionBox from './ActionBox';
import Alerts from './Alerts';
import Colors from '../../Basics/Colors';
import Greeting from './Greeting'
import EducationalMessage from './EducationalMessage'

const HomePage = () => {
    const [educationVisibility,setEducationVisibility ] = useState(false)

    const toggleEducationVisibility = () => {
        setEducationVisibility(!educationVisibility);
    }

    return (
        <Body>
            <EducationalMessage handleClickAway={toggleEducationVisibility} visible={educationVisibility} />
            <Greeting />
            <ActionBox />
            <Progress />
            <button onClick={toggleEducationVisibility}> Test Education</button>
           {/*<Alerts />*/} 
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

