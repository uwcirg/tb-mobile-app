import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import Tooltip from '@material-ui/core/Tooltip';
import Card from './Shared/Card';

const GRAPH_MARKER_SIZE = 20;

const useStyles = makeStyles({

    superContainer: {
        backgroundColor: "white",
        width: "100%",
        height: "100%",
        padding: "4em 1em 4em 1em"
    },
    container: {
        margin: "auto",
        width: "80%",
        height: "250px",
        display: "flex",
        flexDirection: "column",
        position: "relative"

    },
    column: {
        position: "relative",
        width: "100px"
    },
    box: {
        height: `${GRAPH_MARKER_SIZE}px`,
        width: `${GRAPH_MARKER_SIZE}px`,
        borderRadius: `${GRAPH_MARKER_SIZE / 2}px`,
        border: "solid 1px white",
        backgroundColor: Colors.buttonBlue,
        position: "absolute"
    },
    backgroundContainer: {
        opacity: "75%",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        "& > .row": {
            flexGrow: "1",
        }
    },
    xLabel: {
        position: "absolute",
        textAlign: "center",
        top: "-2em",
        display: "flex",
        width: "100%",
        "& > div": {
            flexGrow: "1"
        }
    },
    yLabel: {
        height: "100%",
        position: "absolute",
        left: "-3em",
        display: "flex",
        flexDirection: "column-reverse",
        "& > div": {
            flexGrow: "1",
            display: "flex",
            alignItems: "center"
        }
    },
    xDivider: {
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        display: "flex",
        "& > div": {
            borderRight: "solid 2px white",
            flexGrow: "1"
        },
        "& > div:last-of-type": {
            borderRight: "none"
        }
    },
    bottom: {
        height: "50%",
        width: "100%",
        position: "relative"
    },
    top: {
        height: "50%",
        width: "100%",
        position: "relative"
    }
})

const divider = .85;

const Adherence = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();

    useEffect(() => {
        practitionerStore.getPatientsTest();
    }, [])

    const handleMouseIn = () => {
        console.log("Mouse in")
    }

    const handleMouseOut = () => {
        console.log("mouse out")
    }

    let goodPatients;
    let badPatients;

    const bottom = practitionerStore.testPatients.slice().filter((patient) => {
        return patient.adherence < divider
    })

    const top = practitionerStore.testPatients.slice().filter((patient) => {
        return patient.adherence > divider
    })



    return (
        <Card title={"Overview Of Progress"}>
            <div className={classes.superContainer}>
                <div className={classes.container}>
                    <Background />
                    <div className={classes.top}>
                        {top.map(each => { return (<DataPoint {...each} top />) })}
                    </div>
                    <div className={classes.bottom}>
                        {bottom.map(each => { return (<DataPoint {...each} />) })}
                    </div>
                </div>
            </div>
        </Card>)

});


const DataPoint = (props) => {
    const classes = useStyles();
    let bottomCalc;
    if (props.top) {
        console.log(`${((props.adherence - divider) / (100 - divider)) * 100}`)
        bottomCalc = props.adherence > 0 ? `calc(${((props.adherence - divider) / (1 - divider)) * 100}% - ${GRAPH_MARKER_SIZE}px)` : "0px";
    } else {
        bottomCalc = props.adherence > 0 ? `calc(${(props.adherence/divider) * 100}% - ${GRAPH_MARKER_SIZE}px)` : "0px";
    }

    return (
        <Tooltip title={<><h1>{props.fullName}</h1>
            <p>Adherence: {Math.round(props.adherence * 100)}%</p>
            <p>Days In Treatment: {props.daysInTreatment}</p>
        </>} ><div
            style={{ bottom: bottomCalc, left: `${props.percentageComplete * 100}%` }}
            className={classes.box}> </div></Tooltip>
    )
}

const Background = () => {

    const colors = ["#B2F1BE", "#F0715D"]
    const classes = useStyles();

    let labels = []
    let dividers = []
    let column = []

    for (let step = 0; step < 10; step++) {
        const color = step < 5 ? colors[0] : colors[1];
        column.push(<div className="row" style={{ backgroundColor: color }} />)
        labels.push(<div className="yLabel">.{step * 10}</div>)
    }

    let months = []

    for (let step = 0; step < 6; step++) {
        months.push(<div className="month">Month {step + 1}</div>)
        dividers.push(<div></div>)
    }

    return (
        <div className={classes.backgroundContainer}>
            <div className={classes.xLabel}>{months} </div>
            <div className={classes.yLabel}>{labels}</div>
            <div className={classes.xDivider}>{dividers}</div>
            {column}
        </div>
    )
}

export default Adherence;