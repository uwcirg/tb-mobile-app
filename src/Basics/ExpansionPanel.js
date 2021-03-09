import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import Colors from './Colors';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import Grow from '@material-ui/core/Collapse'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles({

    filledButton: {
        backgroundColor: Colors.buttonBlue,
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
    },
    grow: {
        width: "100%"
    },
    override: {
        padding: "5px"
    }
})

const ExpansionPanel = (props) => {
    const classes = useStyles();
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show);
        
        if(props.toggleFunction){
            props.toggleFunction();
        }
    }

    return (
        <div>
            <ButtonBase onClick={handleClick} className={`${classes.filledButton} ${props.previewClassName}`}>{props.icon}<span>{props.preview}</span>{show ? <Up /> : <Down />}</ButtonBase>
            <Grow in={show} className={classes.grow}>
                {props.children}
            </Grow>
        </div>
    )
}

export default ExpansionPanel;