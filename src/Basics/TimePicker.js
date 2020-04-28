
import React from 'react';
import { TimePicker } from "@material-ui/pickers/TimePicker";
import { makeStyles } from '@material-ui/core';
import Colors from './Colors';

const useStyles = makeStyles({

    textArea: {
        flexGrow: 1,
        width: "100%",
        fontSize: "1em",
        minHeight: "20vh",
        margin: 0,
        alignItems: "flex-start",
        "& > input": {
            padding: 0,
        }
    },
    time: {
        fontSize: "4em",
        color: Colors.buttonBlue,
        borderBottom: `solid 5px ${Colors.buttonBlue}`
    },
    timeSelect: {
        "& > div > input": {
            color: Colors.buttonBlue,
            fontSize: "4em"
        }
    }
});

export default function CustomTimePicker(props) {
    const classes = useStyles();
    return (
        <TimePicker
            className={classes.timeSelect}
            clearable
            ampm={false}
            value={props.value}
            onChange={props.handleChange}
        />
    )
}
