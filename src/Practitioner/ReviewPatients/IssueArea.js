import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { Assignment, CameraAlt, SentimentDissatisfied } from '@material-ui/icons';
import Colors from '../../Basics/Colors';
import Pill from '../../Basics/Icons/Pill';

const useStyles = makeStyles({
    issueContainer:{
        "& svg":{
            paddingRight: ".5em",
            fontSize: "1.5em",
            color: Colors.textGray
        }
    }
})

const IssueArea = (props) => {

    const classes = useStyles();

    return (<Grid className={classes.issueContainer} container>
        <Pill />
        <Assignment />
        <CameraAlt />
        <SentimentDissatisfied />
    </Grid>)

}

export default IssueArea;