import React from 'react';
import { makeStyles, Grid, Badge, Box } from '@material-ui/core';
import { Assignment, CameraAlt, SentimentDissatisfied } from '@material-ui/icons';
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
        backgroundColor: "white"
    }
})

const iconMap = {
    missedMedication: <Pill />,
    symptoms: <Assignment />,
    unreviewedPhoto: <CameraAlt />,
    feelingBad: <SentimentDissatisfied />
}

const getIssues = (patient) => {

    const reports = patient.unresolvedReports;
    let state = { symptoms: 0, missedMedication: 0, feelingBad: 0, photo: 0, missedPhoto: 0 };

    for (let _report of reports) {

        if (_report.symptoms?.length > 0) {
            state.symptoms++;
        }

        if (_report.medicationWasTaken === false) {
            state.missedMedication++;
        }
    }

    return state;
}

const IssueArea = ({ patient }) => {

    const classes = useStyles();
    const issues = getIssues(patient);

    return (<Grid className={classes.issueContainer} container>
        {Object.keys(issues).map((item, index) => {
            if (issues[item] > 0) {
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