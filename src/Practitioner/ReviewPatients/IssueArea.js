import React from 'react';
import { makeStyles, Grid, Badge, Box } from '@material-ui/core';
import { Assignment, CameraAlt, SentimentDissatisfied } from '@material-ui/icons';
import Colors from '../../Basics/Colors';
import Pill from '../../Basics/Icons/Pill';

const useStyles = makeStyles({
    issueContainer: {
        "& svg": {
            fontSize: "1.5em",
            color: Colors.textGray
        }
    }
})

const IssueArea = (props) => {

    const classes = useStyles();

    const icons = [<Pill />,
    <Assignment />,
    <CameraAlt />,
    <SentimentDissatisfied />]

    return (<Grid className={classes.issueContainer} container>
        {icons.map((_icon,index) => {return(<CustomBadge key={`issue-icon-${index}`}>{_icon}</CustomBadge>)})}
    </Grid>)

}

const CustomBadge = (props) => {
    return (
        <>
        <Badge {...props} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }} badgeContent={1} />
        <Box width=".5em" />
        </>
    )
}

export default IssueArea;