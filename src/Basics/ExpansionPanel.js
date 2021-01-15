import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';
import Colors from './Colors';
import IconButton from '@material-ui/core/IconButton'
import WarningOutlined from '@material-ui/icons/ReportProblemOutlined';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import Grow from '@material-ui/core/Collapse'
import ButtonBase from '@material-ui/core/ButtonBase'

const useStyles = makeStyles({

    warning: {
        margin: "auto",
        fontSize: "1em",
        display: "flex",
        alignItems: "center",
        alignSelf: "flex-start",
        width: "90%",
        "& > span": {
            margin: "0 auto 0 .5em"
        },
        "& > svg": {
            color: Colors.red,
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

    const toggleShow = () => {
        setShow(!show);
    }

    return (
        <div>
            <ButtonBase onClick={toggleShow} className={`${classes.warning} ${props.previewClassName}`}>{props.icon}<span>{props.preview}</span><IconButton> {show ? <Up /> : <Down />}</IconButton></ButtonBase>
            <Grow in={show} className={classes.grow}>
                {props.children}
            </Grow>
        </div>
    )
}

export default ExpansionPanel;