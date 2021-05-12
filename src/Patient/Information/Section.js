import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    title: {
        display: "flex",
        alignItems: "center",
        "& > svg":{
            marginRight: ".5em"
        }
    },
    panel:{
        
        "&:last-of-type":{
            boxShadow: "none"
        },
        "&:nth-last-of-type(2)":{
            boxShadow: "none"
        }
    }
})

const Section = (props) =>{
    const classes = useStyles();
    return(
        <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary
            expanded={props.expanded}
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