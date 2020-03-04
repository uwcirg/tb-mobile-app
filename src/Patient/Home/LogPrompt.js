import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { DateTime } from 'luxon';

import { inject, observer } from 'mobx-react';

const LogPrompt = inject("uiStore")(observer(({ uiStore }) => {

    const handleLogTreatment = () => {
        uiStore.onTreatmentFlow = true;
    }

    return (
        <PromptContainer>
            <Fab onClick={handleLogTreatment} size="medium" style={{ backgroundColor: "#4b98e9", color: "white", marginRight: "1em", boxShadow: "none" }} aria-label="add">
                <AddIcon />
            </Fab>
        </PromptContainer>
    )
}));

const PromptContainer = styled.div`
width: 100%;
height: 4em;
display: flex;
margin-top: auto;
position: fixed;
bottom: 60px;
justify-content: flex-end;
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

export default LogPrompt;
