import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import InteractionCard from '../../Basics/InteractionCard';
import { useTranslation } from 'react-i18next';
import { Typography, ButtonBase } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors'
import ReminderItem from './Reminder/ReminderLineItem'
import ClickableText from '../../Basics/ClickableText';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { TimePicker } from "@material-ui/pickers/TimePicker";
import AddReminder from './Reminder/index'

const useStyles = makeStyles({
    header: { fontSize: "1em", fontWeight: "bold", textAlign: "left", width: "100%", paddingLeft: "1em" },
    daily: { width: "100%", marginBottom: "1em", borderBottom: "solid 1px lightgray" },
    upcoming: { width: "100%" },
    options: {
        display: "flex", flexDirection: "row", padding: "0 1em 0 1em", alignItems: "center", justifyContent: "center",
        "& > p": {
            fontSize: ".75em"
        },
        "& > p > span": {
            color: Colors.buttonBlue,
            fontSize: "2em",
            padding: ".5em"
        }
    },
    reminder: { padding: "1em 1em 0 1em" },
    addContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    add: {
        width: "35px",
        height: "35px",
        backgroundColor: Colors.buttonBlue,
        color: "white",
        boxShadow: "none",
        marginLeft: ".5em"
    },
    reminderTitle:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        "& > button":{
            flexBasis: "50%"
        }
    }

})

const Reminders = observer(() => {
    const { patientUIStore } = useStores();

    return (
        <>
            {patientUIStore.onAddReminder && <AddReminder />}
            <Card />
        </>

    )
})

const Card = observer(() => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { patientStore, reminderStore, patientUIStore,uiStore } = useStores();
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        reminderStore.getReminders(patientStore.userID)
    }, [])

    useEffect(() => {
        if (reminderStore.deleteSuccess) {
            patientUIStore.setAlert("Deletion Successful", "warning")
            reminderStore.deleteSuccess = false;
        }
    }, [reminderStore.deleteSuccess])

    return (<InteractionCard upperText={t('patient.reminders.appointments').split(" ")[0]} id="intro-reminders-card">

        <div className={classes.upcoming}>
            <div className={classes.reminderTitle}>
                <Header>{t('patient.reminders.appointments')}</Header>
                {reminderStore.reminders && reminderStore.reminders.length > 0 && <ClickableText hideIcon text={!showAll ? t('appointments.showAll') : t('appointments.showLess')}  onClick={() => { setShowAll(!showAll) }}></ClickableText>}
            </div>
            <div className={classes.reminder}>
                {showAll ? <RemindersList /> :
                    <>{reminderStore.reminders && reminderStore.reminders.length > 0 ? <ReminderItem reminder={reminderStore.reminders[0]} /> : <p>{t('appointments.noUpcoming')}</p>}</>}

            </div>
            <div className={classes.addContainer}>
                <p>{t('appointments.addAppointment')}</p>
                <Fab onClick={patientUIStore.goToAddReminder} className={classes.add}><AddIcon /></Fab>
            </div>
        </div>


    </InteractionCard>)

})

const RemindersList = observer(() => {
    const reminders = useStores().reminderStore.reminders;

    return (
        <>
            {reminders && reminders.length > 0 && reminders.map(each => {
                return <ReminderItem key={`reminder-${each.datetime}`} reminder={each} />
            })}
        </>
    )
})

const Header = (props) => {
    const classes = useStyles();

    return (<Typography className={classes.header} variant="h1">{props.children}</Typography>)
}

export default Reminders;