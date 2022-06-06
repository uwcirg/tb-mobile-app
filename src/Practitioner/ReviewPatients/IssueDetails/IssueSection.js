import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Grid, Hidden, IconButton } from '@material-ui/core';
import Colors from '../../../Basics/Colors';
import SubSectionTitle from '../../../Components/Practitioner/SubSectionTitle';
import { KeyboardArrowDown } from '@material-ui/icons';
import useToggle from '../../../Hooks/useToggle';
import ExpansionToggle from '../../../Components/ExpansionToggle';

const useStyles = makeStyles({
    sectionHeader: {
        backgroundColor: "#EEEEEE",
        padding: "8px",
        borderRadius: "4px 4px 0 0",
        "& svg": {
            fontSize: "1.5em",
            color: Colors.textGray
        }
    },
    icon: {
        color: "black"
    },
    toggleButton:{
        padding: "0"
    }
})

const SectionTitle = ({ icon, title, number, showDetails, toggleDetails }) => {

    const classes = useStyles();

    return (<Grid className={classes.sectionHeader} wrap="nowrap" alignItems="center" container>
        {icon && React.createElement(icon, { style: { color: "black" } })}
        {icon && <Box width=".5em" />}
        {title && <SubSectionTitle>{title}: {number}</SubSectionTitle>}
        <IconButton onClick={toggleDetails} className={classes.toggleButton}>
            <ExpansionToggle expanded={showDetails} />
        </IconButton>
    </Grid>)
}

const IssueSection = (props) => {

    const [showDetails, toggleDetails] = useToggle(true);

    return (
        <>
            <Grid xs={12} md={"auto"}>
                <Box marginBottom="1em">
                    {(props.icon || props.title) && <SectionTitle showDetails={showDetails} toggleDetails={toggleDetails} {...props} />}
                    <Collapse in={showDetails}>
                        <Box borderRadius="4px" border={`solid 1px ${Colors.lightgray}`} padding="0 .5em">
                            <Box padding=".5em" borderRadius="0 0 4px 4px" >
                                {props.children}
                            </Box>
                        </Box>
                    </Collapse>
                </Box>
            </Grid>
            <Hidden smDown>
                <Box flexGrow={1} />
            </Hidden>
        </>
    )

}

export default IssueSection;