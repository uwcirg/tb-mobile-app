import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import Priority from '../Shared/Priority';
import IconButton from '@material-ui/core/IconButton'
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import { DateTime } from 'luxon';

const useStyles = makeStyles({
    row: {
        height: "60px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    name: {
        flexBasis: "120px",
        display: "flex",
        padding: ".5em",
        "& > span":{
            paddingLeft: "1em"
        }
    },
    priority: {
        flexBasis: "80px",
        "& > div": {
            width: "100%"
        }
    },
    container: {
        height: props => props.expanded ? "auto" : "60px",
        boxShadow: "0px 4px 16px rgba(204, 188, 252, 0.15)",
        backgroundColor: "white",
        marginBottom: "1em"
    },
    noSubmission: {
        marginLeft: "1em"
    },
    reportTime: {
        paddingLeft: "1em",
        display: "flex",
        flexDirection: "column",
        "& > span": {
            color: Colors.textGray,
            fontSize: ".875em",
            margin: 0
        }

    },
    badge: {
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.accentBlue,
        borderRadius: "50%",
        width: "25px",
        height: "25px",
        marginRight: "1em"
    }

})


const Row = (props) => {
    const [expanded, setExpanded] = useState(false);
    const { patient } = props;
    const classes = useStyles({ columns: props.columns, expanded: expanded });

    const toggleExpanded = () => {
        setExpanded(!expanded)
    }
    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <IconButton onClick={toggleExpanded}>{expanded ? <Up /> : <Down />}</IconButton>
                <div className={classes.name}>
                    {patient.givenName} {patient.familyName && patient.familyName[0]}.
                    <span >({Object.keys(patient.reportingSummary).length})</span>
                </div>
                <div className={classes.priority}><Priority index={patient.priority} /></div>
                <ReportPreview report={patient.reportingSummary[DateTime.local().toISODate()]} />
            </div>
            {expanded && <div>
                {Object.values(patient.reportingSummary).map(each => {
                    if (!each) return <p>Missed Day</p>
                    if (each) return <p>{each.date}</p>
                })}
            </div>}
        </div>
    )

}

const ReportPreview = (props) => {

    const { report } = props
    const classes = useStyles();

    if (!report) return <p className={classes.noSubmission}>No Submission Today</p>

    return (
        <>
            <ReportTime time={report.takenAt} />
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </>
    )
}

const ReportTime = (props) => {
    const classes = useStyles();
    const dt = DateTime.fromISO(props.time)
    return (<div className={classes.reportTime}>
        {/*<span>{dt.toLocaleString(DateTime.DATE_SHORT)}</span>*/}
        <span>{dt.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
    </div>)
}

export default Row;