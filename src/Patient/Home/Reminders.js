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
    const { t, i18n } = useTranslation(['reminders', 'translation']);
    const { patientStore, patientUIStore } = useStores();
    const [open,setOpen] = useState(false)

    return (<InteractionCard upperText={t('reminders')}>
        <div className={classes.daily}>
            <Header>{t('daily')}</Header>
            {patientStore.reminderTime ? <>
                <div className={classes.options}>
                    <p>a las <span>{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</span> cada día</p>
                </div>
                <div className={classes.buttonContainer}>
                    <ButtonGroup className={classes.timeButtonGroup} fullWidth>
                        <Button>Change Time</Button>
                        <Button>Disable</Button>
                    </ButtonGroup>
                </div>
            </> : <>

                    <div className={classes.enable}>
                        <p> Once enabled, a push notification will remind you to take your medication at the specified time.</p>
                        <Button className={classes.timeButton}>Enable</Button>
                    </div>  </>}
        </div>

        <div className={classes.upcoming}>
            <Header>{t('appointments')}</Header>
            <div className={classes.reminder}>
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

/*
  {timeOpen ? <TimePicker
                    open={timeOpen}
                    className={classes.timeSelect}
                    ampm={false}
                    value={DateTime.fromISO(patientStore.notificationTime)}
                    onChange={(e) => {
                        setTimeOpen(false);
                        handleTimeChange(e);
                    }} /> : <Button className={classes.timeButton} onClick={() => { setTimeOpen(true) }}>{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)} </Button>}
*/