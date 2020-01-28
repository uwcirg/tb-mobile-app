
import React from 'react';
import styled from 'styled-components'
import {styled as mustyled} from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import ButtonBase from '@material-ui/core/ButtonBase'

const BaseStyles = {
    borderRadius: "5px",
    width: "65%",
    margin: "1em auto 0 auto",
    fontSize: "1em"
}


const BinaryField = (props) => {

    const Container = styled.div`
        width: 100%;
        display: flex;
        flex-direction: column;
        

        #yes{
            background-color: #76b661;
        }

        #no{
            background-color: #de391b;
        }

`
    return( 
    <Container>
        <ButtonBase onClick={props.handleYes} style={BaseStyles}>
        <Field id="yes">
            <DoneIcon />
            <span>Yes</span>
        </Field>
        </ButtonBase>

        <ButtonBase onClick={props.handleNo} style={BaseStyles}>
        <Field id="no">
            <NotInterestedIcon />
            <span>No</span>
        </Field>
        </ButtonBase>
    </Container>
        )
}


const Field = styled.div`

width: 100%;


display: flex;
justify-content: flex-start;

padding: 1em;
border-radius: 5px;
font-weight: 600;
color: white;

span{
    display: block;
    margin-left: auto;
}


`

export default BinaryField;