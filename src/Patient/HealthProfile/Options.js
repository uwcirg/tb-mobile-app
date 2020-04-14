import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles/'
import Styles from '../../Basics/Styles'
import ClickableText from '../../Basics/ClickableText'
import { DateTime } from 'luxon'
import { TimePicker } from "@material-ui/pickers/TimePicker";
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles({
    line: {
        display: "block",
        width: "100%",
        borderBottom: "solid 1px lightgray"
    },
    preference: {
        ...Styles.flexRow,
        justifyContent: "space-between",
        width: "90%",
        margin: "auto"

    },
    blueText: {
        padding: "1em",
        fontSize: "1em",
        margin: "auto"
    }
})

const Options = observer(() => {

    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    const [timeOpen, setTimeOpen] = useState(false);

    const handleChange = (date) => {
        patientStore.reminderTime = date.startOf('second').startOf("minute").toISOTime({ suppressSeconds: true });
        patientStore.updateNotificationTime();
    }

    return (
        <>
            <div>
                <h1>{t("patient.profile.options.language")}</h1>
                <FormGroup className={classes.preference}>
                    <FormControlLabel
                        control={<Switch checked={uiStore.isSpanish} onChange={() => { }} name="checkedA" />}
                        label={t("patient.profile.options.spanish")} />
                </FormGroup>
            </div>

            <div>
                <h1>{t("patient.profile.options.dailyNotifications")}</h1>
                <div className={classes.preference}>
                    <p>{t("patient.profile.options.medicationReminder")}</p>
                    <Switch
                        checked={true}
                        onChange={() => { }}
                        color="primary"
                        name="notification enabled"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
                <span className={classes.line} />
                <div className={classes.preference}>
                    <ClickableText
                        hideIcon
                        onClick={() => { setTimeOpen(true) }}
                        className={classes.blueText} 
                        text={`${t("patient.profile.options.remindMe")} ${DateTime.fromISO(patientStore.reminderTime).toLocaleString(DateTime.TIME_24_SIMPLE)}`}
                    />

                    {timeOpen && <TimePicker
                        open={timeOpen}
                        className={classes.timeSelect}
                        clearable
                        ampm={false}
                        value={DateTime.fromISO(patientStore.reminderTime)}
                        onChange={(e) => {
                            setTimeOpen(false);
                            handleChange(e);
                        }}
                    />}
                </div>
            </div>
        </>
    )
});



export default Options;