import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Typography } from '@material-ui/core';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    sectionHeader: {
        "& svg":{
            fontSize: "1.5em",
            color: Colors.textGray
        }
    }
})

const SectionTitle = ({ icon, title, number }) => {

    const classes = useStyles();

    return (
        <Box padding=".5em .25em" >
            <Grid className={classes.sectionHeader} wrap="nowrap" alignItems="center" container>
                {React.createElement(icon)}
                <Box width=".5em" />
                <Typography>{title}: {number}</Typography>
            </Grid>
        </Box>)
}

const IssueSection = (props) => {

    return (<Box marginBottom="1em">
        <SectionTitle {...props} />
        <Box borderRadius="4px" border={`solid 1px ${Colors.lightgray}`} padding="0 .5em">
            <Box padding=".5em" borderRadius="0 0 4px 4px" >
                {props.children}
            </Box>
        </Box>
    </Box>)

}

export default IssueSection;