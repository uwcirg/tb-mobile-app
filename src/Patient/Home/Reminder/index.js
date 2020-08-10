import React from 'react'
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
    const { patientUIStore, reminderStore } = useStores()

    const handleChange = (e) => {
        reminderStore.setType(e.target.value)
    }

    const handleDateTimeChange = (date) =>{
        reminderStore.setDate(date)
    }

    return (<div className={classes.container}>

        <form onSubmit={(event) => { event.preventDefault() }} className={classes.form}>
            <OverTopBar title={"Add Reminder"} handleBack={patientUIStore.closeAddReminder} />
            <TypeSelect handleChange={handleChange} value={reminderStore.newReminder.type} />
            {reminderStore.newReminder.type === "other" && <Input defaultValue={"What type?"}></Input>}
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
            <Button>Submit</Button>
        </form>


    </div>)

})

const TypeSelect = (props) => {
    return (
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={props.value}
            onChange={props.handleChange}
        >
            <MenuItem value={"appointment"}>Appointment</MenuItem>
            <MenuItem value={"medication"}>Medication Pickup</MenuItem>
            <MenuItem value={"sputum"}>Sputum Test</MenuItem>
            <MenuItem value={"other"}>Other</MenuItem>
        </Select>
    )
}

export default AddMilestones;