import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { inject, observer } from 'mobx-react';

const LogPrompt = inject("uiStore")(observer(({ uiStore}) => {

    const handleLogTreatment = () => {
        uiStore.onTreatmentFlow = true;
    }

    return (
        <PromptContainer>
            <DateContainer>
            <span>Today</span>
            <span id="sub-date">Jan 2</span>
            </DateContainer>
            <Fab onClick={handleLogTreatment} size="medium" style={{backgroundColor: "#4b98e9", color: "white", marginRight: "1em"}} aria-label="add">
          <AddIcon />
        </Fab>
            
            <p>Log Medication</p>
        </PromptContainer>
    )
}));

const PromptContainer = styled.div`
width: 100%;
height: 4em;
display: flex;
margin-top: auto;
background-color: #e8f3fc;
position: fixed;
bottom: 60px;
justify-content: flex-start;
align-items: center;

span{
    padding: 0;
    font-size: .75em;
    text-align: right;
}

#sub-date{
    font-size: .5em;
}

`

const DateContainer = styled.div`
display: flex;
flex-direction: column;
height: 50%;
margin: 1em;

`

export default LogPrompt;
