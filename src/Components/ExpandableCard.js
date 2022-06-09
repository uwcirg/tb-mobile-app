import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Collapse, Grid, Hidden, IconButton } from '@material-ui/core';
import Colors from '../Basics/Colors';
import SubSectionTitle from './Practitioner/SubSectionTitle';
import useToggle from '../Hooks/useToggle';
import ExpansionToggle from './ExpansionToggle';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    sectionHeader: {
        padding: "4px",
        borderRadius: "4px 4px 0 0",
        "& svg": {
            fontSize: "1.5em",
            color: Colors.textGray
        }
    },
    icon: {
        color: "black"
    },
    toggleButton: {
        padding: "0"
    }
})

const SectionTitle = ({ icon, title, number, showDetails, toggleDetails, hideToggle }) => {

    const classes = useStyles();

    return (<Grid className={classes.sectionHeader} wrap="nowrap" alignItems="center" container>
        {icon && React.createElement(icon, { style: { color: "black" } })}
        {icon && <Box width=".5em" />}
        {title && <SubSectionTitle>{title} {number}</SubSectionTitle>}
        <Box flexGrow={1} />
        {!hideToggle && <IconButton onClick={toggleDetails} className={classes.toggleButton}>
            <ExpansionToggle expanded={showDetails} />
        </IconButton>}
    </Grid>)
}

const ExpandableCard = (props) => {

    const {children, title, icon} = props;
    const [showDetails, toggleDetails] = useToggle(true);

    return (
        <>
            <Grid item xs={12} md={"auto"}>
                <Box marginBottom="1em">
                    {(icon || title) && <SectionTitle showDetails={showDetails} toggleDetails={toggleDetails} {...props} />}
                    <Collapse in={showDetails}>
                        <Box borderRadius="4px" border={`solid 1px ${Colors.lightgray}`}>
                            <Box padding=".5em" borderRadius="0 0 4px 4px" >
                                {children}
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

ExpandableCard.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    title: PropTypes.string,
    icon: PropTypes.elementType,
    hideToggle: PropTypes.bool
}

export default ExpandableCard;