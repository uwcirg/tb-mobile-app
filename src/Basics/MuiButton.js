import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Colors from './Colors';

const useStyles = makeStyles({

    button: {
        backgroundColor: "white",
        color: Colors.buttonBlue,
        border: `1px solid ${Colors.buttonBlue}`,
        "&:hover": {
            color: Colors.buttonBlue,
            backgroundColor: Colors.accentBlue
        }
    }
})

const MuiButton = (props) => {

    const classes = useStyles();

    return (<Button disabled={props.disabled} className={`${classes.button} ${props.className}`} onClick={props.onClick}>{props.children}</Button>)

}

export default MuiButton;