import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react'
import Calendar from '../Basics/ReportCalendar';
import Card from './Shared/Card';
import CalendarIcon from '@material-ui/icons/Today';
import ProgressGraphs from './ProfileProgress';
import Styles from '../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../Basics/Colors';

const useStyles = makeStyles({
    listItem: {
        fontWeight: "bold",
        textTransform: "capitalize"
    },
    header: {
        width: "90%",
        height: "150px",
        display: "flex"
    },
    patientContainer: {
        ...Styles.flexColumn,
        width: "100%",
        alignItems: "center",
        "& > div + div": {
            marginBottom: "2em"
        }
    },
    historyContainer: {
        width: "100%",
        display: "flex",
        "& > div": {
            width: "90%"
        }
    },
    history: {
        display: "flex"
    },
    reports: {
        marginLeft: "2em",
        flexGrow: 1,
        height: "100%",
    },
    calendarContainer: {
        padding: "1em",
        width: "30%",
    },
    bold: {
        fontWeight: "bold"
    },
    reportsList: {
        ...Styles.flexColumn,
        width: "100%",
        overflow: "scroll",
        height: "400px"
    },
    lineItem:{
        height: "2em",
        display: "flex",
        "& > div": {
            flexGrow: '1',
            height: "100%",
            textAlign: "left"
        },
        borderBottom: "1px solid gray"
    },
    highlight:{
        backgroundColor: Colors.accentBlue
    }
})

const Profile = observer((props) => {

    const { practitionerStore } = useStores();

    useEffect(() => {
        practitionerStore.getPatientDetails(props.id);
    }, [])

    const classes = useStyles();

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED))
    }

    return (
        <div className={classes.patientContainer}>
            <div className={classes.header}>
                <div>
                    {practitionerStore.selectedPatient && <h1>{practitionerStore.selectedPatient.fullName}</h1>}
                    <p><span className={classes.bold}>Phone Number: </span>{practitionerStore.selectedPatient.phoneNumber}</p>
                    <p><span className={classes.bold}>Treatment Start: </span>{getDate(practitionerStore.selectedPatient.treatmentStart)}</p>
                </div>
            </div>
            <ProgressGraphs {...props.patient} />

            

                <ReportingHistory
                    loading={!(props.patient && practitionerStore.selectedPatient.reports)}
                    reports={practitionerStore.selectedPatient.reports}
                    treatmentStart={practitionerStore.selectedPatient.treatmentStart} />

        </div>)
});

const ReportingHistory = (props) => {

    //Uses JS date because thats the format that the calendar wants.
    const [day,setDay] = useState(DateTime.local().toJSDate());
    const classes = useStyles();

    return (
        <Card bodyClassName={classes.history} icon={<CalendarIcon />} title="Reporting Calendar">
            {props.loading ? "loading" :
            <>
            <div className={classes.calendarContainer}>
                <Calendar
                    selectedDay={day}
                    handleChange={(date) =>{setDay(date)}}
                    reports={props.reports}
                    treatmentStart={props.treatmentStart}
                />
            </div>
            <div className={classes.reports}>
            <div className={classes.lineItem}>
                            <div>Date</div>
                            <div>Taken</div>
                            <div>Symptoms</div>
                </div>
                <div className={classes.reportsList}>
                    {Object.values(props.reports).map((each) => {
                        const date = DateTime.fromISO(each.date)
                        const selectedDate = DateTime.fromISO(each.date).startOf('day').equals(DateTime.fromJSDate(day).startOf('day'))
                        return (<div className={`${classes.lineItem} ${selectedDate && classes.highlight}`}>
                            <div>{`${date.day}/${date.month}`}</div>
                            <div>{each.medicationWasTaken ? "true" : "false"}</div>
                            <div>{each.symptoms}</div>
                        </div>)
                    })}
                </div>
            </div>
            </>}
        </Card>)
}


export default Profile;