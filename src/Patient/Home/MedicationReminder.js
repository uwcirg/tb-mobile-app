import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import InteractionCard from '../../Basics/HomePageCard';
import { useTranslation } from 'react-i18next';
import { Typography, ButtonBase } from '@material-ui/core';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors'
import AddReminder from './Reminder/index'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimeDialog from '../../Components/TimeDialog';

const useStyles = makeStyles({
    header: { fontSize: "1em", fontWeight: "bold", textAlign: "left", width: "100%", paddingLeft: "1em" },
    daily: { width: "100%", marginBottom: "1em" },
    upcoming: { width: "100%" },
    options: {
        display: "flex", flexDirection: "row", padding: "0 1em 0 1em", alignItems: "center", justifyContent: "center",
        "& > p": {
            fontSize: ".75em"
        },
        "& > p > span": {
            color: Colors.buttonBlue,
            fontSize: "3em",
            padding: ".5em"
        }
    },
    timeButtonGroup: {
        marginBottom: ".5em",
        border: `solid 1px ${Colors.buttonBlue}`,
        color: Colors.buttonBlue,
        fontSize: "1.5em",
        width: "90%",
        "& > button": {
            color: "inherit",
            textTransform: "capitalize",
            borderTop: "none",
            borderBottom: "none"
        },
        "& > button:first-child": {
            borderLeft: "none"
        },
        "& > button:nth-child(2)": {
            borderRight: "none"
        }
    },
    buttonContainer: { margin: "auto", width: "90%", display: "flex", justifyContent: "center" },
    reminder: { padding: "1em 1em 0 1em" },
    enable: {
        width: "90%",
        margin: "auto",
        display: "flex",
        flexGrow: "1",
        justifyContent: "flex-start",
        alignItems: "center",
        "& > p": {
            fontSize: ".8em",
            width: "60%",
            padding: 0,
            textAlign: "left",
            marginRight: "auto"
        },
        "& > button": {
            margin: "1em",
            color: Colors.buttonBlue,
            border: `solid 1px ${Colors.buttonBlue}`,
            height: "50%"
        }
    },
    container: {
        display: "flex",
        alignItems: "center",
        "& > svg": {
            fontSize: "3em"
        }
    },
    bottomLabel:{
        display: "block",
        width: "100%",
        margin: 0,
        textAlign: "center"
    },
    button:{
        border: `1px solid ${Colors.buttonBlue}`,
        textTransform: "none",
        color: Colors.buttonBlue,
        width: "45%",
        padding: "6px 4px",
        fontSize: "1em",
        "&:first-of-type":{
            marginRight: "1em"
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
    const { t } = useTranslation('translation');
    const { patientStore  } = useStores();
    const [open, setOpen] = useState(false);

    const closeDialog = ()=>{setOpen(false)}

    const handleAccept = () => {
        patientStore.updateNotificationTime();
        closeDialog();
    }

    return (<InteractionCard upperText={<><AccessAlarmIcon />{t('patient.reminders.medicationReminder')}</>} id="intro-reminders-card">
        <div className={classes.daily}>
            {patientStore.reminderTime ? <>
                <p className={classes.bottomLabel}>Reminder will be be sent daily at </p>
                <div className={classes.options}>
                    <p><span>{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</span></p>
                </div>
                <div className={classes.buttonContainer}>
                        <BButton onClick={() => { setOpen(true) }}>{t('patient.reminders.changeTime')}</BButton>
                        <BButton onClick={() => { patientStore.updateNotificationTime(true) }}>{t('patient.reminders.disable')}</BButton>
                </div>
            </> : <>

                <div className={classes.enable}>
                    <p>{t('patient.reminders.explanation')}</p>
                    <Button onClick={() => { setOpen(true) }} className={classes.timeButton}>{t('patient.reminders.enable')}</Button>
                </div>  </>}
        </div>

        <TimeDialog
            open={open}
            handleCancel={closeDialog}
            value={patientStore.newReminderTime}
            setValue={(value) => { patientStore.newReminderTime = value }} 
            closeDialog={closeDialog}
            handleAccept={handleAccept}
            
            />
    </InteractionCard>)

})

const BButton = (props) => {
    const classes = useStyles();
    return <Button {...props} disableElevation className={classes.button} />
}


export default Reminders;