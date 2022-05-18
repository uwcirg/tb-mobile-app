import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import SubSectionTitle from '../../../Components/Practitioner/SubSectionTitle';

const useStyles = makeStyles({
    sectionHeader: {
        "& svg": {
            fontSize: "1.5em",
            color: Colors.textGray
        }
    },
    icon:{
        color: "black"
    }
})

const SectionTitle = ({ icon, title, number }) => {

    const classes = useStyles();

    return (
        <Box padding=".5em .25em" >
            <Grid className={classes.sectionHeader} wrap="nowrap" alignItems="center" container>
                {icon && React.createElement(icon,{style:{color: "black"}})}
                {icon && <Box width=".5em" />}
                {title && <SubSectionTitle>{title}: {number}</SubSectionTitle>}
            </Grid>
        </Box>)
}

const IssueSection = (props) => {

    return (<Box marginBottom="1em">
        {(props.icon || props.title) && <SectionTitle {...props} />}
        <Box borderRadius="4px" border={`solid 1px ${Colors.lightgray}`} padding="0 .5em">
            <Box padding=".5em" borderRadius="0 0 4px 4px" >
                {props.children}
            </Box>
        </Box>
    </Box>)

}

export default IssueSection;