import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Colors from '../../../Basics/Colors';
import useCalendarStyles from './styles';



export default function CalendarKey() {

    return (<div>
        <Typography>Calendar Key:</Typography>
        <SingleItem tookMedication={false}>No report for this day</SingleItem>
        <SingleItem tookMedication>Took Medication</SingleItem>
        <SingleItem modifier tookMedication={false}>Didn't take medication</SingleItem>
        <SingleItem symptom modifier>Side effect reported</SingleItem>
        <SingleItem isToday tookMedication={false}>Today</SingleItem>
    </div>)

}

const SingleItem = (props) => {
    return (<Grid container alignItems='center'>
        <Day {...props} date=" " />
        <Box width=".5em" />
        <Typography>{props.children}</Typography>
    </Grid>)
}

const Day = (props) => {
    const classes = useCalendarStyles();

    return (
        <div style={{ width: "20px", height: "20px", borderRadius: "25%", border: "solid 1px lightgray", backgroundColor: props.isToday && "white" }} className={`${classes.day} ${classes.single} ${!props.modifier && (props.tookMedication ? classes.positive : classes.negative)}`}>
            {props.isToday ? <Box width=".5em" borderBottom={`solid 2px ${Colors.buttonBlue}`} /> : <p>{props.date}</p>}
            {props.modifier ? <div style={props.symptom && { backgroundColor: Colors.yellow }} className={classes.modifier}> </div> : ""}
        </div>
    )
}