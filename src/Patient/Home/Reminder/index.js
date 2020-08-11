import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../../Basics/Styles';
import OverTopBar from '../../Navigation/OverTopBar'
import useStores from '../../../Basics/UseStores';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Button from '../../../Basics/MuiButton'
import { observer } from 'mobx-react'
import { DatePicker, TimePicker } from "@material-ui/pickers";

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';

import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Colors from '../../../Basics/Colors';


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
            margin: "1em"
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
            color: Colors.textGray
        }
    },
    bottomText:{
        margin: "auto"
    }
})

const AddMilestones = observer(() => {

    const classes = useStyles();
    const { patientUIStore, reminderStore,patientStore} = useStores()
    const { t, i18n } = useTranslation('translation');

    const handleChange = (e) => {
        reminderStore.setType(e.target.value)
    }

    const handleDateTimeChange = (date) => {
        reminderStore.setDate(date)
    }

    const handleSubmit = () => {
        reminderStore.create(patientStore.userID)
        patientUIStore.closeAddReminder();
        patientUIStore.setAlert("Reminder Added","success");
    }

    useEffect(() => {
        reminderStore.type = Object.keys(t('reminderTypes',{returnObjects: true}))[0];
    },[])

    return (<div className={classes.container}>

        <form onSubmit={(event) => { event.preventDefault() }} className={classes.form}>
<<<<<<< HEAD
            <OverTopBar title={t('appointments.addApointment')} handleBack={patientUIStore.closeAddReminder} />
=======
            <OverTopBar title={t('appointments.addAppointment')} handleBack={patientUIStore.closeAddReminder} />
>>>>>>> feature/reminders
            <Typography variant="p">{t('appointments.typeQuestion')}</Typography>
            <TypeSelect handleChange={handleChange} value={reminderStore.newReminder.type} />
            {reminderStore.newReminder.type === "other" && <Input placeholder={t("appointments.otherType")}></Input>}
            <Typography variant="p">{t('appointments.selectDate')}</Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label={t('coordinator.patientProfile.date')}
                    value={reminderStore.newReminder.datetime}
                    onChange={handleDateTimeChange}
                    animateYearScrolling
<<<<<<< HEAD
=======
                    disablePast
>>>>>>> feature/reminders
                />
                <TimePicker
                    clearable
                    ampm={false}
                    label={t('report.time')}
                    value={reminderStore.newReminder.datetime}
                    onChange={handleDateTimeChange}
                />
            </MuiPickersUtilsProvider>
            <Typography className={classes.bottomText} variant="p">{t('appointments.remindedAt')} {t('time.noon')}  {t('appointments.dayBefore')} </Typography>
            {reminderStore.loading && <p>Loading</p>}
<<<<<<< HEAD
            <Button onClick={handleSubmit}>{t('appointments.addApointment')}</Button>
=======
            <Button onClick={handleSubmit}>{t('appointments.addAppointment')}</Button>
>>>>>>> feature/reminders
        </form>


    </div>)

})

const TypeSelect = (props) => {

    const { t, i18n } = useTranslation('translation');

    const categories = Object.keys(t('appointments.types',{returnObjects: true}));

    return (
        <>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={props.handleChange}
        >

            {categories.map( (each) => {
                return(
                <MenuItem value={each}>{t(`appointments.types.${each}`)}</MenuItem>
                )
            })}

        </Select>
        </>
    )
}

export default AddMilestones;