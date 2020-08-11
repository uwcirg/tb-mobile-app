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
            width: "30%",
            marginTop: "auto"
        }
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
        patientUIStore.alertText = "Reminder Added"
        patientUIStore.alertVisible = true;
    }

    useEffect(() => {
        reminderStore.type = Object.keys(t('reminderTypes',{returnObjects: true}))[0];
    },[])

    return (<div className={classes.container}>

        <form onSubmit={(event) => { event.preventDefault() }} className={classes.form}>
            <OverTopBar title={"Add Reminder"} handleBack={patientUIStore.closeAddReminder} />
            <TypeSelect handleChange={handleChange} value={reminderStore.newReminder.type} />
            {reminderStore.newReminder.type === "other" && <Input defaultValue={"What type?"}></Input>}
            <p>Details</p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    label="Basic example"
                    value={reminderStore.newReminder.date}
                    onChange={handleDateTimeChange}
                    animateYearScrolling
                />
                <TimePicker
                    clearable
                    ampm={false}
                    label="Remind me at"
                    value={reminderStore.newReminder.date}
                    onChange={handleDateTimeChange}
                />
            </MuiPickersUtilsProvider>
            <Button onClick={handleSubmit}>Submit</Button>
        </form>


    </div>)

})

const TypeSelect = (props) => {

    const { t, i18n } = useTranslation('translation');

    const categories = Object.keys(t('reminderTypes',{returnObjects: true}));

    return (
        <>
        <p>Select Type of Appointment</p>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={props.handleChange}
        >

            {categories.map( (each) => {
                return(
                <MenuItem value={each}>{t(`reminderTypes.${each}`)}</MenuItem>
                )
            })}

        </Select>
        </>
    )
}

export default AddMilestones;