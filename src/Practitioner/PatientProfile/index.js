import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Calendar from '../../Basics/ReportCalendar';
import Card from '../Shared/Card';
import CalendarIcon from '@material-ui/icons/Today';
import ProgressGraphs from '../ProfileProgress';
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Loading from '../Shared/CardLoading'
import ChatIcon from '@material-ui/icons/ChatBubble';
import KeyIcon from '@material-ui/icons/VpnKey';
import ArchiveIcon from '@material-ui/icons/HowToReg';

import ResetPassword from './ResetPassword'


const useStyles = makeStyles({
    listItem: {
        fontWeight: "medium",
        textTransform: "capitalize"
    },
    header: {
        width: "90%",
        height: "150px",
        display: "flex"
    },
    patientContainer: {
        ...Styles.flexColumn,
        height: "100vh",
        overflowY: "scroll",
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
        flexGrow: "1",
        height: "100%",
        padding: "1em"
    },
    calendarContainer: {
        padding: "1em",
        width: "35%",
    },
    bold: {
        fontWeight: "medium"
    },
    reportsList: {
        ...Styles.flexColumn,
        width: "100%",
        overflow: "scroll",
        height: "400px"
    },
    lineItem: {
        display: "flex",
        alignItems: "center",
        padding: ".5em",
        "& > div": {
            textAlign: "left",
            flexBasis: 0,
            flexGrow: 1,
            minHeight: "2em",
        },
        borderBottom: "1px solid gray"
    },
    highlight: {
        backgroundColor: Colors.accentBlue
    },
    stripPhoto: {
        display: "flex",
        justifyContent: "center",
        alignItems: "cener",
        "& > img": {
            width: "90%",
            maxWidth: "150px"
        }
    },
    optionsContainer: {
        display: "flex",
        marginLeft: "auto",
        height: "100%",
        alignItems: "center",
        "& > div": {
            border: `2px solid ${Colors.buttonBlue}`,
            color: Colors.buttonBlue,
            width: "75px",
            height: "75px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: ".5em",
            "& > svg": {
                fontSize: "2em"
            },
            borderRadius: "10%"
        }
    }
})

const Profile = observer((props) => {

    const [onReset, setReset] = useState(false);
    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED))
    }

    const handleCloseReset = () => {
        setReset(false)
        practitionerStore.newActivationCode = ""
    }

    useEffect(() => {
        practitionerStore.getPatientDetails(props.id);
        return function cleanup() {
            handleCloseReset();
        }
    }, [])


    return (
        <>
            {onReset && <ResetPassword close={handleCloseReset} />}
            <div className={classes.patientContainer}>
                <div className={classes.header}>
                    <div>
                        {practitionerStore.selectedPatient.details && <h1>{practitionerStore.selectedPatient.details.fullName}</h1>}
                        <p><span className={classes.bold}>{t("coordinator.patientProfile.phoneNumber")}: </span>{practitionerStore.selectedPatient.details.phoneNumber}</p>
                        <p><span className={classes.bold}>{t("coordinator.patientProfile.treatmentStart")}: </span>{getDate(practitionerStore.selectedPatient.details.treatmentStart)}</p>
                    </div>
                    <div className={classes.optionsContainer}>
                        <div><ChatIcon /></div>
                        <div onClick={() => { setReset(true) }}><KeyIcon /></div>
                        <div><ArchiveIcon /></div>
                    </div>
                </div>
                <ProgressGraphs {...props.patient} />
                <ReportingHistory />

            </div>
        </>)
});

const ReportingHistory = observer(() => {

    //Uses JS date because thats the format that the calendar wants.
    const [day, setDay] = useState(DateTime.local().toJSDate());
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { practitionerStore } = useStores();

    return (
        <Card bodyClassName={classes.history} icon={<CalendarIcon />} title={t("coordinator.cardTitles.reportingCalender")}>
            {practitionerStore.selectedPatient.reportsLoading ? <Loading /> : <>

                {(practitionerStore.selectedPatient.reports && Object.keys(practitionerStore.selectedPatient.reports).length > 0) ?
                    <>
                        <div className={classes.calendarContainer}>
                            <Calendar
                                selectedDay={day}
                                handleChange={(date) => { setDay(date) }}
                                reports={practitionerStore.selectedPatient.reports}
                                treatmentStart={practitionerStore.selectedPatient.details.treatmentStart}
                            />
                        </div>
                        <div className={classes.reports}>
                            <div className={classes.lineItem}>
                                <div>{t("coordinator.patientProfile.date")}</div>
                                <div>{t("coordinator.patientProfile.taken")}</div>
                                <div>{t("coordinator.patientProfile.symptoms")}</div>
                                <div>{t("coordinator.patientProfile.photo")}</div>
                                <div>Mood</div>
                            </div>
                            <div className={classes.reportsList}>
                                {Object.values(practitionerStore.selectedPatient.reports).map((each, i) => {
                                    return <DailyReportPreview index={i} selectedDay={day} setDay={setDay} {...each} />
                                })}
                            </div>
                        </div>
                            </> : <p>No Reports Submitted Yet </p>} </> }
                    
            </Card>)
})

const DailyReportPreview = (props) => {

    const classes = useStyles();
    const date = DateTime.fromISO(props.date)
    const selectedDate = DateTime.fromISO(props.date).startOf('day').equals(DateTime.fromJSDate(props.selectedDay).startOf('day'))
    const { t, i18n} = useTranslation('translation');

    const handleClick = () => {
                props.setDay(DateTime.fromISO(props.date).toJSDate())

            }

    return (<div id={`day-list-${props.date}`} className={`${classes.lineItem} ${selectedDate && classes.highlight}`}
                onClick={handleClick}>
                <div>{`${date.day}/${date.month}`}</div>
                <div>{props.medicationWasTaken ? t("coordinator.true") : t("coordinator.false")}</div>
                <div><ul>{props.symptoms && props.symptoms.length > 0 && props.symptoms.map((symptom) => { return <li>{t(`symptoms.${symptom}.title`)}</li> })}</ul></div>
                <div className={classes.stripPhoto}> {props.photoUrl ? <img src={props.photoUrl} /> : t("commonWords.no")}</div>
                <div>{props.doingOkay ? "Okay" : "Need Support"}</div>
            </div>)
}


export default Profile;