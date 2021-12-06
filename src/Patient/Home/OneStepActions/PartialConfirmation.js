import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Colors from '../../../Basics/Colors';
import { Box, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: "100%",
        padding: ".5em"
    },
    text:{
        lineHeight: "1.25em"
    }
})

const PartialConfirmation = ({isPhoto = false}) => {

    const classes = useStyles();

    return (<Grid wrap="nowrap" className={classes.container} container alignItems="center">
        <CheckCircleIcon fontSize="large" style={{ color: Colors.green }} />
        <Box width="2em" />
        <Typography className={classes.text} variant="body1">Your photo was successfully submitted and uploaded</Typography>
    </Grid>)

}

export default PartialConfirmation;