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

const issueIconMap = {
    missedMedication: <Pill />,
    reportedSymptoms: <Assignment />,
    hasUnreviewedPhoto: <CameraAlt />,
    reportedFeelingBad: <SentimentDissatisfied />
}

const getIssues = (patient) => {
    return([{icon: issueIconMap.missedMedication, number: 2},{icon: issueIconMap.reportedSymptoms, number: 1}])
}

const IssueArea = ({patient}) => {

    const classes = useStyles();
    const issues = getIssues(patient);

    return (<Grid className={classes.issueContainer} container>
        {issues.map((item, index) => { return (<CustomBadge key={`issue-icon-${index}-${patient.id}`}>{item.icon}</CustomBadge>) })}
    </Grid>)

}

const CustomBadge = (props) => {

    const classes = useStyles();

    return (
        <>
            <Badge {...props} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }} badgeContent={1}
                classes={{ badge: classes.badge }}
            />
            <Box width=".5em" />
        </>
    )
}

export default IssueArea;