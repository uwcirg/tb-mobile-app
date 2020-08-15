import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import SurveyHeader from './SurveyHeader';
import { useTranslation } from 'react-i18next';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import { TimePicker } from "@material-ui/pickers/TimePicker";


const useStyles = makeStyles((theme) => ({
    selected: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.accentBlue
        }
    },
    default: {
        backgroundColor: "white",
        color: Colors.buttonBlue,
        "&:hover": {
            color: Colors.buttonBlue,
            backgroundColor: Colors.accentBlue
        }
    },
    group: {
        marginBottom: "2em"
    },
    timeButton:{
        border: `solid 1px ${Colors.buttonBlue}`,
        color: Colors.buttonBlue,
        fontSize: "1.5em"
    }
}));

const Notification = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const [timeOpen, setTimeOpen] = useState(false)
    const {activationStore,uiStore} = useStores();

    const handleTimeChange = (dateTime) => {
        activationStore.onboardingInformation.notificationTime = dateTime.toISOTime();
    }

    return (<div className={props.bodyClass}>
        <SurveyHeader number={3} title={t("patient.onboarding.notification.one")} />
        <DisableElevation />
        {activationStore.onboardingInformation.enableNotifications &&
            <>
                <SurveyHeader number={4} title={t("patient.onboarding.notification.two")} />
                {timeOpen ?<TimePicker
                    open={timeOpen}
                    className={classes.timeSelect}
                    ampm={uiStore.locale === "en"}
                    value={DateTime.fromISO(activationStore.onboardingInformation.notificationTime)}
                    onChange={(e) => {
                        setTimeOpen(false);
                        handleTimeChange(e);
                    }} /> : <Button className={classes.timeButton} fullWidth onClick={() => {setTimeOpen(true)}}>{DateTime.fromISO(activationStore.onboardingInformation.notificationTime).toLocaleString(DateTime.TIME_24_SIMPLE)} </Button> }
            </>}
    </div>)
});

const DisableElevation = observer(() => {
    const classes = useStyles();
    const {activationStore} = useStores();

    return (
        <ButtonGroup className={classes.group} fullWidth color="primary">
            <Button onClick={() => { activationStore.onboardingInformation.enableNotifications = true }} className={activationStore.onboardingInformation.enableNotifications ? classes.selected : classes.default}>Yes</Button>
            <Button onClick={() => { activationStore.onboardingInformation.enableNotifications = false }} className={!activationStore.onboardingInformation.enableNotifications ? classes.selected : classes.default}>No</Button>
        </ButtonGroup>
    );
})



export default Notification;


