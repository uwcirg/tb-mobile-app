import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import InteractionCard from '../../Basics/HomePageCard';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import AddReminder from './Reminder/index';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import TimeDialog from '../../Components/TimeDialog';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';



const useStyles = makeStyles({
    header: { fontSize: "1em", fontWeight: "bold", textAlign: "left", width: "100%", paddingLeft: "1em" },
    daily: {
        width: "100%",
        padding: "0 1em 1em 1em",
        boxSizing: "border-box"
    },
    options: {
        color: Colors.buttonBlue,
        fontSize: "3em",
        padding: 0,
        margin: 0
    },
    reminder: { padding: "1em 1em 0 1em" },
    bottomLabel: {
        display: "block",
        width: "100%",
        margin: 0,
        textAlign: "center"
    },
    button: {
        "& > svg":{
            fontSize: ".75em"
        },
        display: "flex",
        alignItems: "center",
        "& > span": {
            lineHeight: "1em"
        },
        flex: "1 1 0",
        border: props => `1px solid ${props.color || Colors.buttonBlue}`,
        textTransform: "none",
        color: props => props.color || Colors.buttonBlue,
        padding: ".5em",
        fontSize: "1em",
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
    const { patientStore } = useStores();
    const [open, setOpen] = useState(false);

    const closeDialog = () => { setOpen(false) }

    const handleAccept = () => {
        patientStore.updateNotificationTime();
        closeDialog();
    }

    return (<InteractionCard upperText={<><AccessAlarmIcon />{t('patient.reminders.medicationReminder')}</>} id="intro-reminders-card">
        <div className={classes.daily}>
            {patientStore.reminderTime ? <>
                <Grid container wrap="nowrap" alignItems="center">
                    <Typography variant="body1">Reminder will be be sent daily at </Typography>
                    <Typography className={classes.options} variant="body1">{DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}</Typography>
                </Grid>
                <Grid container justify="space-around">
                    <Option onClick={() => { setOpen(true) }}><EditIcon /> {t('patient.reminders.changeTime')}</Option>
                    <Grid item xs={1} />
                    <Option color={Colors.red} onClick={() => { patientStore.updateNotificationTime(true) }}> <CancelIcon />{t('patient.reminders.disable')}</Option>
                </Grid>
            </> : <Grid alignItems="center" container>
                <Grid item xs={8}>{t('patient.reminders.explanation')}</Grid>
                <Grid item xs={4} >
                    <Option onClick={() => { setOpen(true) }} className={classes.timeButton}>{t('patient.reminders.enable')}</Option>
                </Grid>
            </Grid>
            }
        </div>

        <TimeDialog
            open={open}
            handleCancel={closeDialog}
            value={patientStore.newReminderTime}
            setValue={(value) => { patientStore.newReminderTime = value }}
            closeDialog={closeDialog}
            handleAccept={handleAccept} />
    </InteractionCard>)

})

const Option = (props) => {
    const classes = useStyles({color: props.color});
    return <Button {...props} disableElevation className={classes.button} />
}


export default Reminders;