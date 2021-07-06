import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    title: {
        // backgroundColor: props => props.highlight ? props.highlight : "unset",
        // padding: props => props.highlight ? ".5em" : "unset",
        borderRadius: props => props.highlight ? "5px" : "unset",
        display: "flex",
        alignItems: "center",
        "& > svg": {
            marginRight: ".5em"
        }
    },
    panel: {
        "&:last-of-type": {
            boxShadow: "none"
        },
        "&:nth-last-of-type(2)": {
            boxShadow: "none"
        }
    },
    summary:{
        backgroundColor: props => props.highlight ? props.highlight : "unset",
    }
})

const Section = (props) => {
    const classes = useStyles({ highlight: props.highlight });
    const [expanded, setExpanded] = useState(props.expanded);

    return (
        <ExpansionPanel onClick={() => { setExpanded(!expanded) }} expanded={expanded} className={classes.panel}>
            <ExpansionPanelSummary
                className={classes.summary}
                expandIcon={<Down className={classes.icon} />}
                aria-controls="information-section-header"
                id="information-section-header"
            >
                <Typography className={classes.title}>{props.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
                {props.children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default Section;