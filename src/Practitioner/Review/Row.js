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
            marginRight: ".5em",
            width: `${100/9}%`
        }
    },
    name: {
        display: "flex",
        padding: ".5em",
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
        paddingLeft: "1em",
        color: Colors.textGray,
        fontSize: ".875em",
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
    symptoms: {
        display: "flex",
        flexDirection: "column",
        fontSize: ".875em",
        margin: 0,
        padding: 0,
        color: Colors.textGray
    },
    common:{
        flexBasis: "15%",
        display: "flex",
        alignItems: "center",
        "& > div":{
            flexBasis: "50%"
        }
    },
    report:{
        flexGrow: "1",
        display: "flex",
        "& > div":{
            flexGrow: 1,
        }
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
                <div className={classes.common}>
                <div className={`${classes.name} name`}>
                    {patient.givenName} {patient.familyName && patient.familyName[0]}.
                    <span >({Object.keys(patient.reportingSummary).length})</span>
                </div>
                <div className={`${classes.priority} priority`}><Priority index={patient.priority} /></div>
                </div>

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
    const { t, i18n } = useTranslation('translation');

    if (!report) return (<>
        <div className={classes.noSubmission}>No Submission Today</div>
    </>)
    const symptomToDisplay = getFirstSevereSymptomFromArray(report.symptoms)
    const displayedSymptom = t(`symptoms.${symptomToDisplay || report.symptoms[0]}.title`)
    const more = report.symptoms.length - 1

    return (
        <div className={classes.report}>
            <ReportTime time={report.takenAt} />
            <div className={`symptoms ${classes.symptoms}`}>
                {report.symptoms.length > 0 ? <span>{displayedSymptom} </span> : <span>No Symptoms</span>}
                {report.symptoms.length > 1 && <span>+{more} More</span>}
                </div>
            <div>Doing Okay<Feeling doingOkay={true} /></div>
            <div>Tst</div>
            <div>Test</div>
            <div>Test</div>
            <IconButton><Dots /></IconButton>
        </div>
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