import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import Badge from '@material-ui/core/Badge';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    reportRow: {
        display: "flex"
    },
    image: {
        height: "100px",
        marginLeft: "auto"
    },
    report: {
        padding: ".5em",
        width: "100%",
        marginBottom: "1em",
        backgroundColor: "#f1f5fe",
        border: `2px solid #0F81E0`,
        borderRadius: "10px",
        "& > p": {
            padding: 0,
            margin: 0
        }
    },
    container: {
        height: "100vh",
        overflow: "scroll",
        width: "25vw",
        marginLeft: "auto",
        "& > h1": {
            textAlign: "center"
        }
    },
    reportContainer: {
        width: "90%",
        margin: "auto",
        position: "relative"
    },
    patient: {
        width: "100%",
        display: "flex",
        "& > p": {
            padding: 0,
            margin: 0,
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: "16px",
            lineHeight: "19px"
        }
    },
    reportTime: {
        alignSelf: "center",
        padding: "1em",
        fontSize: ".75em"
    },
    ruler: {
        position: "absolute",
        height: "100%",
        width: "5px",
        left: "5px",
        backgroundColor: Colors.reportBlue,
        zIndex: "-1"
    },
    date: {
        backgroundColor: "white"
    },
    circle: props => ({
        height: "15px",
        width: "15px",
        backgroundColor: props.medicationWasTaken?  Colors.approvedGreen : Colors.red,
        borderRadius: "50%",
        marginRight: "5px"
    })
})

const RecentReports = observer((props) => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getPatientsTest();
        practitionerStore.getRecentReports()
    }, [])


    const classes = useStyles();

    return (<div className={classes.container}>
        <h1>Recent Reports</h1>
        {practitionerStore.recentReports.length > 0 && <Reports reports={practitionerStore.recentReports} />}
    </div>)

});

const Reports = observer((props) => {
    const classes = useStyles();
    const { practitionerStore } = useStores();

    let date = {};
    const list = props.reports.map((report) => {
        let isNewDate = false;
        if (!DateTime.fromISO(report.date).equals(date)) {
            date = DateTime.fromISO(report.date)
            isNewDate = true;
        }
        return (
            <>
                {isNewDate && <p className={classes.date}>{date.toLocaleString(DateTime.DATE_MED)}</p>}
                <div className={classes.reportRow}>
                    <div className={classes.timelineCircle} />
                    <p className={classes.reportTime}>{DateTime.fromISO(report.updatedAt).toLocaleString(DateTime.TIME_24_SIMPLE)}</p>
                    <div className={classes.report}>
                        <Patient {...practitionerStore.getPatient(report.userId)} medicationWasTaken={report.medicationWasTaken} />
                        <p>{report.medicationWasTaken ? "Took Meds" : "Didnt Take Meds"}</p>
                        <Symptoms list={report.symptoms} />
                        {report.photoUrl ? <img className={classes.image} src={report.photoUrl} /> : <p>No Photo</p>}
                    </div>
                </div>
            </>
        )
    })

    return (
        <div className={classes.reportContainer}>
            <div className={classes.ruler} />
            {list}
        </div>
    )
});

const Symptoms = (props) => {
    const { t, i18n } = useTranslation('translation');

    if (props.list.length === 0) {
        return <p>No Symptoms Reported</p>
    }

    const symptomList = props.list.map(each => {
    return <li>{t(`symptoms.${each}.title`)}</li>
    })

    return (
        <ul>
            {symptomList}
        </ul>
    )

}

const Patient = (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.patient}>
            <div className={classes.circle}></div><p>{props.fullName}</p>
        </div>
    )
}

export default RecentReports