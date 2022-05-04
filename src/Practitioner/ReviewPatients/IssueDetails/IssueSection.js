import React, { Children } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';
import { CameraAlt } from '@material-ui/icons';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    title: {
        paddingBottom: "1em"
    },
    avatar: {
        fontSize: "1em",
        width: "1.5em",
        height: "1.5em",
        backgroundColor: Colors.buttonBlue
    },
    icon: {
        color: Colors.textGray
    }
})

const SectionTitle = ({ icon, title, number }) => {

    const classes = useStyles();

    return (<Grid className={classes.title} wrap="nowrap" alignItems="center" container>
        {React.createElement(icon, { className: classes.icon })}
        <Box width=".5em" />
        <Typography>{title}</Typography>
        <Box flexGrow="1" />
        <Avatar className={classes.avatar} >{number}</Avatar>
    </Grid>)
}

const IssueSection = (props) => {

    return (<Box padding=".5em" marginBottom={".5em"}>
        <SectionTitle {...props} />
        <Box >
            {props.children}
        </Box>
    </Box>)

}

export default IssueSection;