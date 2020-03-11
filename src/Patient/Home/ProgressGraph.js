import React from 'react';
import styled from 'styled-components';
import { CircularProgressbarWithChildren as CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles'
import Styles from '../../Basics/Styles';
import InteractionCard from './InteractionCard';
import Colors from '../../Basics/Colors';
import NewButton from '../../Basics/NewButton';

const useStyles = makeStyles({
    progressText:{
        textAlign: "center",
        color: Colors.accentBlue,
        padding: 0,
        margin: 0,
        position: "relative",
        top: "-1em",
        fontSize: "5vw"
    },
    graph:{
        width: "50%",
        margin: "auto",
    },
    stats:{
        ...Styles.flexRow,
        justifyContent: "flex-end",
        position: "relative",
        top: "-2em"
    },
    statBox:{
        ...Styles.flexColumn,
        width: "28vw",
        alignContent: "center",
        alignItems: "center",
        "&:first-child": {
            borderRight: `1px solid ${Colors.gray}`
        },
        "&:last-child": {
            borderLeft: `.5px solid ${Colors.gray}`
        }

    },
    statBoxTitle:{
        fontSize: "1em",
        textAlign: "center",
        color: Colors.accentBlue,
        margin: "0 0 .5em 0",
        padding: 0,
    },
    statBoxText:{
        width: "80%",
        textAlign: "center",
        margin: 0,
        padding: 0,
        color: Colors.textGray,
        fontWeight: 250
    },
    actionButton:{
        position: "relative",
        top: "-2em"
    }

})

const ProgressGraph = (props) => {
    const classes = useStyles();

    return (
        <InteractionCard upperText={"My Progress"}>
            <div className={classes.graph}>
            <CircularProgressbar  circleRatio={0.5} value={25} styles={buildStyles({
                transition: 'stroke-dashoffset 0.5s ease 0s',
                pathColor: Colors.accentBlue,
                rotation: 3 / 4,
                strokeLinecap: "round"  
            })}>
               <p className={classes.progressText}> 90 of <br /> 180 Days</p>
            </CircularProgressbar>
            </div>
            <div className={classes.stats}>
            <StatBox title='4 Days' text="Current Streak" />
            <StatBox title='Feb 28' text="Next Check In" />
            <StatBox title='Oct 2' text="Estimated End Date"/>
            </div>
        </InteractionCard>
    )
}

function StatBox (props){
    const classes = useStyles();
    return(
    <div className={classes.statBox}>
    <h2 className={classes.statBoxTitle}>{props.title}</h2>
    <span className={classes.statBoxText}>{props.text}</span>
</div>
)
}


export default ProgressGraph;
