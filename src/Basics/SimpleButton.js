import React from 'react';
import styled from '@material-ui/core/styles/styled';
import Button from '@material-ui/core/Button'
import { StylesProvider } from '@material-ui/core/styles/'


const SimpleButton = (props) => {

    const CustomButton = styled(Button)({
        color: props.color ? props.color : "white",
        backgroundColor: props.disabled? "gray" : (props.backgroundColor ? props.backgroundColor : ""),
        textTransform: "none"
    })
        
    return (
        <CustomButton color="primary" onClick={props.onClick} variant="contained" disabled={props.disabled}>{props.children}</CustomButton>)

};

export default SimpleButton;