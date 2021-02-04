import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase } from '@material-ui/core';
import Colors from './Colors'

const useStyles = makeStyles({
    warning: {
        backgroundColor: Colors.yellow,
        padding: '.5em .75em .5em .75em',
        margin: "auto",
        marginBottom: ".5em",
        borderRadius: "25px",
        boxSizing: "border-box",
        fontSize: "1em",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        width: "90%",
        "& > span": {
            margin: "0 auto 0 .5em",
            color: "white"
        },
        "& > svg": {
            color: "white"
        }
    }
})

const SecondaryButton = (props) => {

    const classes = useStyles();

    return(<ButtonBase onClick={props.onClick} className={classes.warning}>
       {props.children}
    </ButtonBase>)

}

export default SecondaryButton;