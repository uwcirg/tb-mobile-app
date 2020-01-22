import React from 'react';
import styled from '@material-ui/core/styles/styled';
import Button from '@material-ui/core/Button'

const SimpleButton = (props) => {

    const CustomButton = styled(Button)({
        
        color: props.color ? props.color : "white",
        backgroundColor: props.backgroundColor ? props.backgroundColor : "",
        textTransform: "none",
        width: "35vw",
        height: "6vh"
    })
        
    return (<CustomButton color="primary" onClick={props.onClick} variant="contained" >{props.children}</CustomButton>)

};

export default SimpleButton;