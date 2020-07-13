import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';


const useStyles = makeStyles({
    image: {
        height: "100px",
        marginLeft: "auto"
    },
    report: {
        display: "flex",
        width: "100%",
        border: "2px solid lightgray"

    },
    container: {
        width: "100%",
        marginLeft: "1em"
    },
    reportContainer: {
        width: "50%"
    },
    patient: {
        backgroundColor: "lightgray"
    }
})

const Settings = observer((props) => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getRecentReports()
    }, [])


    const classes = useStyles();

    return (<div className={classes.container}>
        <h1>Settings</h1>
    </div>)

});

const Reports = observer((props) => {
    const classes = useStyles();
    const { practitionerStore } = useStores();

    const list = props.reports.map((report) => {
        return (
            <div className={classes.report}>
                <Patient {...practitionerStore.getPatient(report.userId)} />
                <p>{report.tookMedication ? "Took Meds" : "Didnt Take Meds"}</p>
                <p>{report.date}</p>
                {report.photoUrl ? <img className={classes.image} src={report.photoUrl} /> : <p>N/A</p>}
            </div>
        )
    })

    return (
        <div className={classes.reportContainer}>
            {list}
        </div>
    )
});

const Patient = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.patient}>
            <p>{props.fullName}</p>
        </div>
    )
}

export default Settings;