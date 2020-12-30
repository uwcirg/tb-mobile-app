//Helpful https://www.varvet.com/blog/format-numbers-in-input-fields-using-react/

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from 'mobx-react';
import useStores from './UseStores';
import { DateTime } from 'luxon';
import IconButton from '@material-ui/core/IconButton';
import UpIcon from '@material-ui/icons/KeyboardArrowUp'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'

const useStyles = makeStyles((theme) => ({
    container: {
        width: "80%",
        display: 'flex',
        justifyContent: "center",
        "& > input[type=number]::-webkit-inner-spin-button, & > input[type=number]::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0
        }
    },
    input: {
        flex: 0,
        height: "300px",
        textAlign: "center",
        fontSize: "2em",
        padding: "0",
        margin: 0,
        border: "none",
        backgroundColor: "rgba(128, 178, 255, 0)"
    },
    seperator: {
        width: "10px",
        flex: "0",
        display: "flex",
        alignItems: "center",
        margin: "0 .25em 0 .25em",
        fontSize: "2em",
        fontWeight: "bold"
    },
    clockSide: {
        width: "50%",
        display: "flex",
        flexDirection: "column",
        "& > button": {
            alignSelf: "center"
        },
        backgroundColor: "rgba(128, 178, 255, 0.5)",
        borderRadius: "5px",
    }
}));

const SingleSide = (props) => {
    const classes = useStyles();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    }

    const increment = () => {
        props.handleChange(props.timeType, props.value + 1);
    }

    const decrement = () => {
        props.handleChange(props.timeType, props.value - 1);
    }

    const handleChange = (event) => {
        props.handleChange(props.timeType, event.target.value);
    }


    return (
        <div className={classes.clockSide}>
            <IconButton id={props.id} onClick={increment} ><UpIcon /></IconButton>
            {isEditing ?
                <input
                    className={`${classes.input} ${classes.hour}`}
                    pattern="[0-9]*"
                    id={props.timeType}
                    type="number"
                    value={String(props.value).padStart(2, '0')}
                    onChange={handleChange}
                    onBlur={toggleEditing}
                /> :
                <input
                    readOnly
                    className={`${classes.input} ${classes.hour}`}
                    pattern="[0-9]*"
                    id={props.timeType}
                    type="text"
                    value={String(props.value).padStart(2, '0')}
                    onChange={handleChange}
                    onFocus={toggleEditing}
                />}
            <IconButton id={props.id} onClick={decrement}><DownIcon /></IconButton>
        </div>
    )
}

const TimePicker = observer((props) => {
    const classes = useStyles();
    // Remove for interoprability const { patientStore } = useStores();

    const parsed = props.timeTaken ? DateTime.fromISO(props.timeTaken) : DateTime.local();
    const hour = parsed.hour;
    const minute = parsed.minute;

    //If less than 10 add a zero to the front digit  

    return (
        <form className={classes.container} noValidate>
            <SingleSide timeType="hour" handleChange={props.handleChange} value={hour} />
            <div className={classes.seperator}>
                <span>:</span>
            </div>
            <SingleSide timeType="minute" handleChange={props.handleChange} value={minute} />
        </form>
    );
});


export default TimePicker;