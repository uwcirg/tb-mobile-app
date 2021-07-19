import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import OverTopBar from '../../Navigation/OverTopBar'
import useStores from '../../../Basics/UseStores';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/TextField';
import Button from '../../../Basics/MuiButton'
import { observer } from 'mobx-react'
import { TimePicker } from "@material-ui/pickers";
import DatePicker from '../../../Basics/DatePicker';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import { DateTime } from 'luxon';
import TimeDialog from '../../../Components/TimeDialog';

const useStyles = makeStyles({
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        zIndex: 100,
        paddingTop: "60px"
    },
    form: {
        "& > div": {
            margin: "1em 0"
        },
        height: "80%",
        marginTop: "1em",
        display: "flex",
        margin: "auto",
        flexDirection: "column",
        width: "90%",
        "& > button": {
            alignSelf: "flex-end",
            width: "50%",
            marginTop: "auto"
        },
        "& > span": {
            color: Colors.textDarkGray
        }
    },
    bottomText: {
        margin: "auto"
    }
})

const AddMilestones = observer(() => {

    const classes = useStyles();
    const { patientUIStore, reminderStore, patientStore } = useStores();
    const { t } = useTranslation('translation');

    const [tempTime, setTempTime] = useState(DateTime.fromISO(reminderStore.newReminder.datetime));
    const [open, setOpen] = useState(false);

    const handleChange = (e) => {
        reminderStore.setCategory(e.target.value)
    }

    const handleDateTimeChange = (date) => {
        setTempTime(date);
    }

    const handleSubmit = () => {
        reminderStore.create(patientStore.userID)
        patientUIStore.closeAddReminder();
        patientUIStore.setAlert(t('patient.reminders.successMessage'), "success");
    }

    const handleAccept = () => {
        reminderStore.newReminder.datetime = tempTime;
        setOpen(false);
    }

    useEffect(() => {
        reminderStore.type = Object.keys(t('reminderTypes', { returnObjects: true }))[0];
    }, [])

    return (<div className={classes.container}>
        <form onSubmit={(event) => { event.preventDefault() }} className={classes.form}>
            <OverTopBar title={t('appointments.addAppointment')} handleBack={patientUIStore.closeAddReminder} />
            <span>{t('appointments.typeQuestion')}</span>
            <TypeSelect handleChange={handleChange} value={reminderStore.newReminder.category} />
            {reminderStore.newReminder.category === "other" && <Input onChange={(e) => { reminderStore.setOther(e.target.value) }} value={reminderStore.newReminder.otherCategory} placeholder={t("appointments.otherType")}></Input>}
            <Input onChange={(e) => { reminderStore.setNote(e.target.value) }} value={reminderStore.newReminder.note} placeholder="Add a note" />
            <span>{t('appointments.selectDate')}</span>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label={t('coordinator.patientProfile.date')}
                    value={tempTime}
                    onChange={handleDateTimeChange}
                    animateYearScrolling
                    disablePast
                    handleAccept={handleAccept}
                />
                <TimeDialog
                    title={t('patient.reminders.whatTime')}
                    open={open}
                    handleCancel={() => { setOpen(false) }}
                    value={tempTime}
                    setValue={(value) => { setTempTime(value) }}
                    closeDialog={() => { setOpen(false) }}
                    handleAccept={handleAccept} />
                <Input InputProps={{readOnly: true}} label={t('report.time')} onClick={() => { setOpen(true) }}
                    value={DateTime.fromISO(reminderStore.newReminder.datetime).toLocaleString(DateTime.TIME_SIMPLE)}
                />
            </MuiPickersUtilsProvider>
            <span className={classes.bottomText}>{t('appointments.remindedAt')} {t('time.noon')}  {t('appointments.dayBefore')} </span>
            {reminderStore.loading && <p>{t('commonWords.loading')}</p>}
            <Button onClick={handleSubmit}>{t('appointments.addAppointment')}</Button>
        </form>
    </div>)

})
{/* <TimePicker
                    clearable
                    ampm={false}
                    label={t('report.time')}
                    value={reminderStore.newReminder.datetime}
                    onChange={handleDateTimeChange}
                /> */}

const TypeSelect = (props) => {

    const { t } = useTranslation('translation');

    const categories = Object.keys(t('appointments.types', { returnObjects: true }));

    return (
        <>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.value}
                onChange={props.handleChange}
            >

                {categories.map((each) => {
                    return (
                        <MenuItem value={each}>{t(`appointments.types.${each}`)}</MenuItem>
                    )
                })}

            </Select>
        </>
    )
}

export default AddMilestones;