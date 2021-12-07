import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Colors from '../../../Basics/Colors';
import { Box, ButtonBase, Collapse, Grow, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ClickableText from '../../../Basics/ClickableText';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Review from './ReviewSubmission';
import useToggle from '../../../Hooks/useToggle';


const useStyles = makeStyles({
    container: {
        width: "100%",
        padding: ".5em"
    },
    text: {
        lineHeight: "1.25em",
        fontSize: ".9em"
    },
    editButton: {
        display: "flex",
        flexDirection: "column",
        fontSize: "1em",
        color: Colors.buttonBlue
    },
    editIcon: {
        fontSize: "1.5em"
    },
    editText: {
        fontSize: ".75em"
    }
})

const PartialConfirmation = ({ isPhoto = false }) => {

    const classes = useStyles();
    const [showPreview, toggleShowPreview] = useToggle(false);

    return (<div>
        <Grid wrap="nowrap" className={classes.container} container alignItems="center">
            <CheckCircleIcon fontSize="large" style={{ color: Colors.green }} />
            <Box width="2em" />
            <Typography className={classes.text} variant="body1">
                {isPhoto ? "Your photo was successfully submitted and uploaded" : "Your daily report has been recorded successfully"}
            </Typography>
            <ButtonBase onClick={toggleShowPreview} className={classes.editButton}>
                <KeyboardArrowDown className={classes.editIcon} />
                <Typography className={classes.editText} variant="body1">View</Typography>
            </ButtonBase>
        </Grid>
        <Collapse in={showPreview}>
            <Review />
        </Collapse>
    </div>)

}

export default PartialConfirmation;