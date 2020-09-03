import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../Basics/Colors';
import Priority from '../Shared/Priority';
import IconButton from '@material-ui/core/IconButton'
import Down from '@material-ui/icons/KeyboardArrowDown'
import Up from '@material-ui/icons/KeyboardArrowUp'
import { DateTime } from 'luxon';
import { getFirstSevereSymptomFromArray } from '../../Basics/SymptomsSeperation';
import { useTranslation } from 'react-i18next';
import FeelingGood from '@material-ui/icons/Mood'
import FeelingBad from '@material-ui/icons/MoodBad'
import Dots from '@material-ui/icons/MoreVert';

const useStyles = makeStyles({
    row: {
        height: "60px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        "& > div":{
            paddingRight: ".5em",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flex: "1 1 0px"
        },
        "& > *":{
            fontSize: ".875em",
            margin: 0,
            padding: 0,
            color: Colors.textGray
        }
    },
    name: {
        display: "flex",
        "& > span": {
            marginLeft: "auto"
        }
    },
    priority: {
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
        color: Colors.textGray,
        fontSize: ".875em",
    },
    reportTime: {
        "& > span": {
            textAlign: 'left',
            color: Colors.textGray,
            fontSize: ".875em",
            margin: 0
        }

    },
    symptoms: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start !important",
    },
    actions:{
        margin: 0,
        padding: "0 .5em 0 0",
        flexBasis: "1em"
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
                <div className={`${classes.name} name`}>
                    {patient.givenName} {patient.familyName && patient.familyName[0]}.
                    {/*<span >({Object.keys(patient.reportingSummary).length})</span>*/}
                </div>
                <div className={`${classes.priority} priority`}><Priority index={patient.priority} /></div>
                <ReportPreview report={(patient.reportingSummary.length > 0 && patient.reportingSummary[0].date === DateTime.local().toISODate()) ? patient.reportingSummary[0] : null } />
            </div>
            {expanded && <div>
                <OldReports reports={patient.reportingSummary.slice(1)} date={DateTime.fromISO(patient.lastResolution).startOf("day")} />
                {/*Object.values(patient.reportingSummary).map(each => {
                    if (!each) return <p>Missed Day</p>
                    if (each) return <p>{each.date}</p>
                })*/}
            </div>}
        </div>
    )

}
const OldReports = (props) => {
    let lastResolved = props.date;
    let dates = []
   
    let i = 0;
    let d = DateTime.local().minus({day: 1})
    while(d.diff(lastResolved,"days").days > 0){
        if(props.reports && props.reports.length > 0 && props.reports[i] && props.reports[i].date === d.toISODate()){
            dates.push(<div>{props.reports[i].medicationWasTaken ? "Taken" : "Not Taken"}</div>)
            i++;
        }else{
            dates.push(<div>No Report</div>)
        }
        d = d.minus({days: 1})
        

    }

    return(
        <>
       {dates}
        </>
    )
}

const ReportPreview = (props) => {

    const { report } = props
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    if (!report) return (<>
        <div className={classes.noSubmission}>No Submission Today</div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <IconButton className={classes.actions}><Dots /></IconButton>
    </>)
    const symptomToDisplay = getFirstSevereSymptomFromArray(report.symptoms)
    const displayedSymptom = t(`symptoms.${symptomToDisplay || report.symptoms[0]}.title`)
    const more = report.symptoms.length - 1

    return (
        <>
            <ReportTime time={report.takenAt} />
            <div className={`symptoms ${classes.symptoms}`}>
                {report.symptoms.length > 0 ? <span>{displayedSymptom} </span> : <span>No Symptoms</span>}
                {report.symptoms.length > 1 && <span>+{more} More</span>}
                </div>
            <div><span>Okay </span><Feeling doingOkay={true} /></div>
            <div>Tst</div>
            <div>Test</div>
            <IconButton className={classes.actions}><Dots /></IconButton>
        </>
    )
}

const ReportTime = (props) => {
    const classes = useStyles();
    const dt = DateTime.fromISO(props.time)
    return (<div className={`submitted ${classes.reportTime}`}>
        {/*<span>{dt.toLocaleString(DateTime.DATE_SHORT)}</span>*/}
        <span>{dt.toLocaleString(DateTime.TIME_24_SIMPLE)}</span>
    </div>)
}

const Feeling = (props) => {

    return (
        <>
            {props.doingOkay ? <FeelingGood style={{ color: Colors.green }} /> : <FeelingBad style={{ color: Colors.red }} />}
        </>
    )
}

export default Row;