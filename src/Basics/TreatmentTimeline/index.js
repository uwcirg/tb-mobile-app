import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Colors from '../Colors';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Down from '@material-ui/icons/KeyboardArrowDown'
import Typography from '@material-ui/core/Typography'
import Styles from '../Styles';

const useStyles = makeStyles({

    monthContainer: {
        minHeight: "50px",
        display: "flex",
        width: "100%",
        "& > first-child": {
            backgroundColor: "gray"
        }


    },
    line: {
        flexGrow: "1",
        height: "auto",
        borderLeft: `dotted 2px ${Colors.accentBlue}`,
    },
    monthNumber: {
        color: Colors.accentBlue,
        fontSize: "1.5em"
    },
    container: {
        maxWidth: "320px",
        margin: "auto",
        width: "90%"
    },
    panel: {
        width: "100%",
        marginTop: ".5em",
        border: "none",
        borderRadius: "8px",
        boxShadow: "none",
        "&::before": {
            opacity: 0
        }
    },
    panelContainer: {
        marginLeft: "1em",

    },
    summary: {
        "&.Mui-expanded": {
            minHeight: "unset"

        },
        padding: "0 .5em 0 .5em",
        margin: 0,
        "& > .titles": {
            ...Styles.flexColumn
        },
        "& > .MuiExpansionPanelSummary-content": {
            margin: 0
        }, borderRadius: "8px",
        backgroundColor: props => props.backgroundColor || Colors.calendarGreen
    },
    subtitle: {
        fontSize: ".8em",
        color: Colors.textGray

    },
    timeline: {
        ...Styles.flexColumn,
        minWidth: "50px",
        alignItems: "center"
    },
    icon: {
        color: Colors.buttonBlue
    },
    monthLabel: {
        fontSize: "1em"
    },
    currentMonth:{
        color: "white",
        borderRadius: "50%",
        ...Styles.flexCenter,
        height: "32px",
        width: "32px",
        backgroundColor: Colors.accentBlue
    }
})


const Timeline = () => {

    const classes = useStyles();

    return (<div className={classes.container}>
        <Month first number={0}>
            <Panel title="Start of treatment" subtitle="Week 0" />
            <Panel title="Intensive Phase" subtitle="Week 1-8" />
        </Month>
        <Month number={1}>
            <Panel backgroundColor={Colors.timelineYellow} title="Intensive Phase" subtitle="Week 1-8" />
        </Month>
        <Month number={2} />
        <Month number={3} />
        <Month number={4}>
            <Panel backgroundColor={Colors.lightgray} title="Intensive Phase" subtitle="Week 1-8" />
        </Month>
        <Month number={5} />
        <Month number={6} />
    </div>)

};

const Month = observer((props) => {
    const classes = useStyles();
    //const isCurrentMonth = Math.floor(useStores().patientStore.patientInformation.weeksInTreatment / 4) === props.number;
    let isCurrentMonth = props.number == 1

    return (
        <>
            <div className={classes.monthContainer}>
                <div className={classes.timeline}>
                    {props.first && <div className={`${classes.monthNumber} ${classes.monthLabel}`}>Month</div>}
                    <div className={`${classes.monthNumber} ${isCurrentMonth && classes.currentMonth}`}>{props.number}</div>
                    {props.number !==6 && <div className={classes.line} />}
                </div>
                <div className={classes.panelContainer}>
                    {props.children}
                </div>
            </div>
        </>)
});

const Panel = (props) => {
    const classes = useStyles(props);
    return (
        <ExpansionPanel className={classes.panel}>
            <ExpansionPanelSummary
                className={classes.summary}
                expandIcon={<Down className={classes.icon} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className="titles">
                    <Typography className={classes.title}>{props.title}</Typography>
                    <Typography className={classes.subtitle}>{props.subtitle}</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
        </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>)
}

export default Timeline;