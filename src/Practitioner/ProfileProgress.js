import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from './Shared/Card';
import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Styles from '../Basics/Styles';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import Colors from '../Basics/Colors';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const useStyles = makeStyles({
    container: {
        height: "300px",
        display: "flex",
        alignItems: "center",
        padding: "1em",
        "& > div": {
            width: "20%",
            margin: "1em",
            ...Styles.flexColumn,
            justifyContent: "center",
            textAlign: "center",
            fontSize: ".75em"



        }
    },
    rightText: {
        ...Styles.flexColumn,
        height: "90%",
        paddingLeft: "1em",
        borderLeft: "1px solid gray",
        "& > div": {
            fontSize: "1em",
            textAlign: "left",
            display: "flex",
            alignItems: "center"
        }
    },
    largeText: {
        fontSize: "2em"
    }
})

const ProgressGraphs = (props) => {
    const classes = useStyles();

    return (
        <Card icon={<DonutLargeIcon />} title="Current Status" >
            <div className={classes.container}>
                <SingleGraph color={Colors.accentBlue} value={.75} largeText={`${props.daysInTreatment}/180`} bottomText="Completed days" />
                <SingleGraph color={Colors.red} value={props.adherence} largeText={`${props.adherence * 100}%`} bottomText="Adherence" />
                <SingleGraph color={Colors.approvedGreen} value={props.feelingHealthyDays/props.daysInTreatment} largeText={`${(props.feelingHealthyDays/props.daysInTreatment).toFixed(2) * 100}%`} bottomText="Doing Okay" />
                <div className={classes.rightText}>
                    <div><TrendingUpIcon /><p>Current Streak: {props.currentStreak} Days</p></div>
                    <div> <p>Longest Streak: Coming Soon</p></div>
                </div>
            </div>
        </Card>
    )
}

const SingleGraph = (props) => {
    const classes = useStyles();
    return (
        <CircularProgressbar styles={{ path: { stroke: props.color } }} value={props.value * 100}>
            <div>
                <span className={classes.largeText}>{props.largeText}</span>
                <br />
                {props.bottomText}
            </div>
        </CircularProgressbar>
    )
}

export default ProgressGraphs;
