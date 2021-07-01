import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    warningContainer: {
        backgroundColor: Colors.accentBlue,
        padding: "2em",
        boxSizing: "border-box",
        width: "100%"
    },
    button: {
        alignSelf: "flex-end"
    }
})


const PushEnrollmentReminder = () => {

    //Default to true so that its not flickering for happy path
    const [enabled, setEnabled] = useState(true);
    const [blocked, setBlocked] = useState(false);

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
        else if (Notification.permission !== 'denied'){
            setBlocked(true);
        }
        
        else if (Notification.permission === "default") {
            return false;
        }

    }

    return (<>
        {!enabled && <Grid direction="column" alignContent="center" className={classes.warningContainer} container spacing={1}>
            <Typography variant="body1">It looks like your notiifcations are turned off</Typography>
            <Typography variant="body1">Notifications help remind you about when to take your medication, or submit a photo</Typography>
            <Button className={classes.button} onClick={enableFlow}>Click here to Enable</Button>
        </Grid>}
    </>)

}

export default PushEnrollmentReminder;