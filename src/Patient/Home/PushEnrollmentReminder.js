import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Colors from '../../Basics/Colors'
import WarningIcon from '@material-ui/icons/WarningRounded'
import ProfileButton from '../../Practitioner/PatientProfile/ProfileButton'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import useStores from '../../Basics/UseStores'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    warningContainer: {
        backgroundColor: "white",
        padding: "1.5em 2em",
        boxSizing: "border-box",
        width: "100%",
        // boxShadow: "inset 0px -27px 24px -27px rgba(0,0,0,0.5)",
        "& > *": {
            // marginBottom: ".5em"
        },
        "& > ul": {
            margin: 0,
            marginBottom: "1em",
            padding: "0 0 0 1em"
        },
        "& > p, & > span": {
            padding: ".5em"
        }
    },
    button: {
        alignSelf: "flex-end",
        textTransform: "capitalize",
        alignItems: "center",
        "& > span > svg":{
            paddingRight: 0,
            fontSize: "1.5em"
        }
    },
    title: {
        display: "flex",
        fontSize: "1.2em",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.warningRed,
        padding: ".5em",
        color: "white",
        borderRadius: "5px"
    }
})

const PushEnrollmentReminder = () => {

    const {uiStore} = useStores();
    //Default to true so that its not flickering for happy path
    const [enabled, setEnabled] = useState(true);
    const [notificationState, setNotificationState] = useState(false);
    const { t } = useTranslation('translation');

    useEffect(() => {
        setEnabled(checkPushEnabled());
    }, [])

    const classes = useStyles();

    const enableFlow = () => {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                setEnabled(true);
            }
        });
    }

    const checkPushEnabled = () => {
        if (!("Notification" in window)) {
            console.log("This browser does not support desktop notification");
        }

        else if (Notification.permission === "granted") {
            return true
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            setBlocked(true);
        }

        else if (Notification.permission === "default") {
            return false;
        }

    }

    const goToInstructions = () => {
        uiStore.push("/information?onPushEnrollmentInstructions=true")
    }

    return (<>
        {!enabled && <Grid direction="column" className={classes.warningContainer} container spacing={1}>
            <Typography className={classes.title} variant="h2">{t('notificationInstructions.warning.title')}<WarningIcon /></Typography>
            <Typography variant="body1">{t('notificationInstructions.warning.subtitle')}</Typography>
            <ul>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.medicationReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.aptReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.msgAlerts')}</Typography></li>
            </ul>
            <ProfileButton className={classes.button} onClick={goToInstructions}>{t('notificationInstructions.warning.button')}<RightIcon /></ProfileButton>
        </Grid>}
    </>)

}

export default PushEnrollmentReminder;