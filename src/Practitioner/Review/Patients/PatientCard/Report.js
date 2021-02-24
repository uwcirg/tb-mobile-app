import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Colors from '../../../../Basics/Colors';
import Submitted from '../../../Home/SubmittedVisual';
import useStores from '../../../../Basics/UseStores';
import { DateTime } from 'luxon';


const useStyles = makeStyles({
    reportContainer: {
        padding: ".5em",
        width: "auto",
    },
    coloredBox: {
        display: "block",
        width: "30px",
        height: "30px",
        flexShrink: 0,
        borderRadius: "5px",
        backgroundColor: props => props.color || Colors.green
    },
    reportItem: {
        marginLeft: ".5em",
        display: "flex",
        alignItems: "flex-start",
        "& > p": {
            marginLeft: "5px"
        }
    },
    report:{
        display: "flex",
        "& > div":{
            flex: "1 1 0"
        }
        
    },
    reportPhoto:{
        height: "100px",
        width: "100px",
        marginLeft: ".5em",
        objectFit: "contain",
    },
    notSubmitted:{
        alignItems: "center"
    }
})

const itemStyles = makeStyles({
    text: {
        marginLeft: ".5em",
        "& > p": {
            margin: 0
        }
    }
})

const Report = (props) => {

    const classes = useStyles();

    return (<div className={classes.reportContainer}>
        {props.report ? <SubmittedReport report={props.report} /> : <NotSubmitted />}
    </div>)

}

const SubmittedReport = ({ report }) => {
    const classes = useStyles();
    const textClasses = itemStyles();

    return (
        <div className={classes.report}>
            <div className={classes.reportItem}>
                <ColoredBox color={Colors.green} />
                <div className={textClasses.text}>
                    <strong>Medication</strong>
                    <p>{DateTime.fromISO(report.takenAt).toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                </div>
            </div>

            <div className={classes.reportItem}>
            <ColoredBox color={report.symptoms.length < 1 ? Colors.green : Colors.yellow} />
                <div className={textClasses.text}>
                    <strong>Symptoms</strong>
                    <p>{report.symptoms.length === 0 ? "None" : report.symptoms.length}</p>
                </div>

            </div>
            <div className={classes.reportItem}>
            <ColoredBox color={report.doingOkay ? Colors.green : Colors.red} />
                <div className={textClasses.text}>
                    <strong>Feeling</strong>
                    <p>{report.doingOkay ? "Okay" : "Requested Support"}</p>
                    {report.doingOkayReason && <p>{report.doingOkayReason}</p>}
                </div>

            </div>

            {report.photoWasRequired && <div className={classes.reportItem}>
            <ColoredBox color={report.status.photoReport ? Colors.green : Colors.red} />
                <div className={textClasses.text}>
                    <strong>Photo</strong>
                    <p>{report.status.photoReport ? "Submitted" : "Skipped"}</p>
                </div>
                {report.photoUrl && <img src={report.photoUrl} className={classes.reportPhoto} />}

            </div>}

        </div>
    )
}

const NotSubmitted = () => {
    const classes = useStyles();
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <div className={`${classes.reportItem} ${classes.notSubmitted}`}> <ColoredBox color={Colors.yellow} /> <p>Report Not Yet Submitted</p> </div>
        </div>
    )
}

const ColoredBox = (props) => {
    const classes = useStyles({ color: props.color });
    return (
        <span className={classes.coloredBox}>

        </span>
    )
}

export default Report;