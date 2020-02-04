import React from 'react';
import styled from 'styled-components'
import ButtonBase from '@material-ui/core/ButtonBase'


const LargeSelector = (props) => {

    const BaseStyles = {
        borderRadius: "5px",
        width: "65%",
        margin: "1em auto 0 auto",
        fontSize: "1em",
        backgroundColor: props.backgroundColor
    }

    return (
        <ButtonBase onClick={props.onClick} style={BaseStyles}>
            <Field id={props.id}>
                {props.children}
            </Field>
        </ButtonBase>
    )
}

const Field = styled.div`

width: 100%;
display: flex;
justify-content: flex-start;
align-items: center;
padding: 1em;
border-radius: 5px;
font-weight: 600;
color: white;

span{
    margin: auto;
    display: block;
}
`

export default LargeSelector;