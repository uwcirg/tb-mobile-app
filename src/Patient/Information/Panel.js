import React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    test: {
        border: 'solid 1px blue',
        height: "100px",
        overflow: 'scroll'
    },
    panel: {
        boxShadow: "none"
    },
    summary:{
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0
    },
    heading:{
        backgroundColor: "lightblue"
    }
})

export default function Test(props) {

    const classes = useStyles();

    const title = props.children.find(each => {
        return each.type === "h1"
    })

    return (
        <Panel title={title.props.children[0]} children={props.children} />
    )
}


function Panel(props) {
    const classes = useStyles();
    return (
        <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
                className={classes.summary}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{props.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    {props.children}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}