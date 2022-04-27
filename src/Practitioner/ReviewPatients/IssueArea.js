import React from 'react';
import { makeStyles, Grid, Badge, Box } from '@material-ui/core';
import { Assignment, CameraAlt, EventAvailable, EventBusy, SentimentDissatisfied } from '@material-ui/icons';
import Colors from '../../Basics/Colors';
import Pill from '../../Basics/Icons/Pill';

const useStyles = makeStyles({
    issueContainer: {
        width: "fit-content",
        "& svg": {
            fontSize: "1.5em",
            color: Colors.textGray
        }
    },
    badge: {
        backgroundColor: Colors.lighterGray
    }
})

const iconMap = {
    missedMedication: <Pill />,
    missedReporting: <EventBusy style={{color: Colors.red}} />,
    goodDays: <EventAvailable style={{color: Colors.approvedGreen}} />,
    symptoms: <Assignment />,
    unreviewedPhotos: <CameraAlt />,
    feelingBad: <SentimentDissatisfied />
}

const IssueArea = ({ patient }) => {

    const classes = useStyles();
    const issues = patient.issues.state;

    return (<Grid className={classes.issueContainer} container>
        {Object.keys(issues).map((item, index) => {
            if (issues[item] > 0 && iconMap[item]) {
                return (<CustomBadge badgeContent={issues[item]} key={`issue-icon-${index}-${patient.id}`}>{iconMap[item]}</CustomBadge>)
            }
        })}
    </Grid>)
}

const CustomBadge = (props) => {

    const classes = useStyles();

    return (
        <>
            <Badge {...props} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
                classes={{ badge: classes.badge }}
            />
            <Box width=".5em" />
        </>
    )
}

export default IssueArea;