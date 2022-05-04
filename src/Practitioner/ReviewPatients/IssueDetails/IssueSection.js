import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    icon: {
        color: Colors.textGray
    }
})

const SectionTitle = ({ icon, title, number }) => {

    const classes = useStyles();

    return (
        <Box padding=".5em">
            <Grid wrap="nowrap" alignItems="center" container>
                {React.createElement(icon, { className: classes.icon })}
                <Box width=".5em" />
                <Typography>{title}: {number}</Typography>
            </Grid>
        </Box>)
}

const IssueSection = (props) => {

    return (<Box>
        <SectionTitle {...props} />
        <Box padding="0 .5em">
            <Box padding=".5em" borderRadius="0 0 4px 4px" bgcolor={Colors.lighterGray} >
                {props.children}
            </Box>
        </Box>
    </Box>)

}

export default IssueSection;