import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid'

const GRAPH_MARKER_SIZE = 20;
const divider = .9;

const useStyles = makeStyles({
    xLabelAndGraph: {
        flexGrow: 1
    },
    visContainer: {
        fontWeight: "medium",
        color: Colors.textDarkGray,
        width: "100%"
    },
    superContainer: {
        boxSizing: "border-box",
        width: "100%",
        padding: "0",
        display: "flex"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        position: "relative",
        height: "250px",
        width: "100%"

    },
    column: {
        position: "relative",
        width: "100px"
    },
    box: {
        height: `${GRAPH_MARKER_SIZE}px`,
        width: `${GRAPH_MARKER_SIZE}px`,
        borderRadius: `100%`,
        backgroundColor: Colors.buttonBlue,
        border: "solid .5px white",
        position: "absolute"
    },
    backgroundContainer: {
        borderRadius: "4px",
        overflow: "hidden",
        opacity: "33%",
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
        height: "35px",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        "& > div": {
            flexGrow: "1",
            fontWeight: "medium"
        }
    },
    yLabel: {
        width: "55px",
        height: "100%",
        padding: "0 .5em",
        display: "flex",
        flexDirection: "column-reverse",
        justifyContent: "space-between",
        "& > div:last-child": {
            alignItems: "flex-start"
        },
        "& > div:nth-child(2)": {
            alignItems: "center"
        },
        paddingBottom: "70px",
        boxSizing: "border-box"

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
        flex: "1 1 0",
        width: "100%",
        position: "relative"
    },
    top: {
        flex: "1 1 0",
        width: "100%",
        position: "relative"
    },
    monthLabel:{
        height: "35px",
        textTransform: "capitalize"
    }
})

const Adherence = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    useEffect(() => {
        practitionerStore.getPatients();
    }, [])

    const bottom = practitionerStore.patientList.slice().filter((patient) => {
        return patient.adherence < divider && patient.daysInTreatment < 180
    })

    const top = practitionerStore.patientList.slice().filter((patient) => {
        return patient.adherence > divider && patient.daysInTreatment < 180
    })


    let labels = []
    let dividers = []
    let column = []
    const colors = [Colors.green, Colors.red]

    for (let step = 0; step < 10; step++) {
        const color = step < 5 ? colors[0] : colors[1];
        column.push(<div className="row" key={`background-column-${step}`} style={{ backgroundColor: color }} />)
        //labels.push(<div className="yLabel">.{step * 10}</div>)
    }

    labels.push(<span key={`background-label-0`} className="yLabel">0%</span>)
    labels.push(<span key={`background-label-1`} className="yLabel">90%</span>)
    labels.push(<span key={`background-label-2`} className="yLabel">100%</span>)


    let months = []

    for (let step = 0; step < 6; step++) {
        months.push(<div key={`background-month-${step}`} className="month">{step + 1}</div>)
        dividers.push(<div key={`background-divider-${step}`}></div>)
    }

    return (
        <div className={classes.superContainer}>
            <div className={classes.yLabel}>{labels}</div>
            <div className={classes.xLabelAndGraph}>
                <div className={classes.container}>
                    <Background />
                    <div className={classes.top}>
                        {top.map((each, i) => { return (<DataPoint key={`datapoint-top-${i}`} {...each} top />) })}
                    </div>
                    <div className={classes.bottom}>
                        {bottom.map((each, i) => { return (<DataPoint key={`datapoint-bottom-${i}`} {...each} />) })}
                    </div>
                </div>
                <div className={classes.xLabel}>{months} </div>
                <Grid className={classes.monthLabel} container justify="center" spacing={1}>
                    <span>{t('time.month')}</span>
                </Grid>
            </div>
        </div>)

});


const DataPoint = (props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');

    let bottomCalc;
    if (props.top) {
        bottomCalc = props.adherence > 0 ? `calc(${((props.adherence - divider) / (1 - divider)) * 100}%)` : "0px";
    } else {
        bottomCalc = props.adherence > 0 ? `calc(${(props.adherence / divider) * 100}%)` : "0px";
    }

    return (
        <Tooltip title={<><h1>{props.fullName}</h1>
            <p>{t("coordinator.adherence")}: {Math.round(props.adherence * 100)}%</p>
            <p>{t("coordinator.daysInTreatment")}: {props.daysInTreatment}</p>
        </>} ><div
            style={{ bottom: bottomCalc, left: `${props.percentageComplete * 100}%` }}
            className={classes.box}> </div></Tooltip>
    )
}

const Background = () => {

    const colors = [Colors.green, Colors.red]
    const classes = useStyles();

    let dividers = []
    let column = []

    for (let step = 0; step < 10; step++) {
        const color = step < 5 ? colors[0] : colors[1];
        column.push(<div className="row" key={`background-column-${step}`} style={{ backgroundColor: color }} />)
        //labels.push(<div className="yLabel">.{step * 10}</div>)
    }

    for (let step = 0; step < 6; step++) {
        dividers.push(<div key={`background-divider-${step}`}></div>)
    }

    return (
        <div>
            <div className={classes.visContainer}>
                <div className={classes.backgroundContainer}>
                    {column}
                </div>
                <div className={classes.xDivider}>{dividers}</div>
            </div>
        </div >
    )
}

export default Adherence;