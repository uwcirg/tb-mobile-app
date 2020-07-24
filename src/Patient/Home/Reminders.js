import React, { useState } from 'react'
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
import { MileStone } from '../Progress/Milestones'
import ClickableText from '../../Basics/ClickableText';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { TimePicker } from "@material-ui/pickers/TimePicker";

const useStyles = makeStyles({
    header: { fontSize: "1em", fontWeight: "bold", textAlign: "left", width: "100%", paddingLeft: "1em" },
    daily: { width: "100%", marginBottom: "1em", borderBottom: "solid 1px lightgray" },
    upcoming: { width: "100%" },
    options: { display: "flex", flexDirection: "row", padding: "0 1em 0 1em", alignItems: "center", justifyContent: "center",
    "& > p": {
        fontSize: ".75em"
    },
    "& > p > span":{
        color: Colors.buttonBlue,
        fontSize: "2em",
        padding: ".5em"
    } },
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
        "& > button:first-child":{
            borderLeft: "none"
        },
        "& > button:nth-child(2)":{
            borderRight: "none"
        }
    },
    buttonContainer: { width: "100%", display: "flex", justifyContent: "center" },
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
    addContainer:{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    add:{
        width: "35px",
        height: "35px",
        backgroundColor: Colors.buttonBlue,
        color: "white",
        boxShadow: "none",
        marginLeft: ".5em"
    }

})

const CompName = observer(() => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { patientStore, patientUIStore } = useStores();
    const [open,setOpen] = useState(false)

    const handleChange = (date) => {
        patientStore.reminderTime = date.startOf('second').startOf("minute").toISOTime({ suppressSeconds: true });
        patientStore.updateNotificationTime();
    }


    return (<InteractionCard upperText={t('patient.reminders.title')} id="intro-reminders-card">
        <div className={classes.daily}>
            <Header>{t('patient.reminders.medicationReminder')}</Header>
            {patientStore.reminderTime ? <>
                <div className={classes.options}>
                    <p>a las <span>{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</span> cada día</p>
                </div>
                <div className={classes.buttonContainer}>
                    <ButtonGroup className={classes.timeButtonGroup} fullWidth>
                        <Button onClick={() => {setOpen(true)}}>{t('patient.reminders.changeTime')}</Button>
                        <Button onClick={() =>{patientStore.updateNotificationTime(true)}}>{t('patient.reminders.disable')}</Button>
                    </ButtonGroup>
                </div>
            </> : <>

                    <div className={classes.enable}>
                        <p>{t('patient.reminders.explanation')}</p>
                        <Button onClick={()=>{setOpen(true)}} className={classes.timeButton}>{t('patient.reminders.enable')}</Button>
                    </div>  </>}
        </div>

        {open && <TimePicker
                        open={open}
                        className={classes.timeSelect}
                        clearable
                        ampm={false}
                        value={DateTime.fromISO(patientStore.reminderTime)}
                        onChange={(e) => {
                            setOpen(false);
                            handleChange(e);
                        }}
                    />}

        <div className={classes.upcoming}>
            <Header>{t('patient.reminders.appointments')}</Header>
            <div className={classes.reminder}>
            <p>This functionality is still in progress</p>
                {patientStore.milestones[0] && <MileStone milestone={patientStore.milestones[0]} />}
            </div>
            <div className={classes.addContainer}>
                <p>Add Reminder</p>
                <Fab className={classes.add}><AddIcon /></Fab>
            </div>
        </div>


    </InteractionCard>)

})

const Header = (props) => {
    const classes = useStyles();

    return (<Typography className={classes.header} variant="h1">{props.children}</Typography>)
}

export default CompName;