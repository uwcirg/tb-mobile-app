import React, { useState } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import Grow from '@material-ui/core/Collapse'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles({
    container: {
        width: "100%"
    },
    preview: {
        boxSizing: "border-box",
        fontSize: "1em",
        display: "flex",
        "& > span": {
            margin: "0 auto 0 .5em",
        },
        "& > svg": {

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
        <div className={classes.container}>
            <ButtonBase disableRipple onClick={handleClick} className={`${classes.preview} ${props.previewClassName}`}>
                {props.icon}
                <Typography variant="body1">{show ? props.previewOpenText : props.previewClosedText}</Typography>
                {show ? <Up /> : <Down />}
                </ButtonBase>
            <Grow in={show} className={classes.grow}>
                {props.children}
            </Grow>
        </div>
    )
}

export default ExpansionPanel;