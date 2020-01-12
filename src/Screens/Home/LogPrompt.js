import React from 'react';
import styled from 'styled-components';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const LogPrompt = () => {
    return (
        <PromptContainer>
            <DateContainer>
            <span>Today</span>
            <span id="sub-date">Jan 2</span>
            </DateContainer>
            <Fab size="medium" style={{backgroundColor: "#4b98e9", color: "white"}} aria-label="add">
          <AddIcon />
        </Fab>
            
            <p>Lets log your medication today</p>
        </PromptContainer>
    )
}

const PromptContainer = styled.div`
width: 100%;
height: 4em;
display: flex;
margin-top: auto;
background-color: #e8f3fc;
position: relative;
top: -60px;
justify-content: space-evenly;
align-items: center;



span{
    margin: 0;
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

`

export default LogPrompt;
