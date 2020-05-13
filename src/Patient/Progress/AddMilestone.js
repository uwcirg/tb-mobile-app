import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import OverTopBar from '../Navigation/OverTopBar'
import TimePicker from '../../Basics/TimePicker'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Switch from '@material-ui/core/Switch'
import SimpleButton from '../../Basics/SimpleButton'
import NumberedTitle from '../Navigation/NumberedTitle';
import TextField from '@material-ui/core/TextField'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/luxon';
import { DateTime } from 'luxon';
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react';

function ButtonGroup(props) {
    const [value, setValue] = React.useState(null);
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.handleTitle(props.options[event.target.value]);
    };

    const keys = Object.keys(props.options)

    const options = keys.map((option, index) => {
        return <FormControlLabel key={`milestone-option-${index}`} value={option} control={<Radio color="primary" className={classes.radio} />} label={props.options[option]} />
    })
    options.push(<FormControlLabel key={`milestone-option-other`} value="other" control={<Radio color="primary" className={classes.radio} />} label={t("commonWords.other")} />)

    return (
        <FormControl className={classes.inputContainer} component="fieldset">
            <RadioGroup aria-label="milestone-name" name="milestone" value={value} onChange={handleChange}>
                {options}
                {value === "other" && <TextField required id="other-input" defaultValue={""} />}
            </RadioGroup>
        </FormControl>
    );
}

function DateScreen(props) {
    const { t, i18n } = useTranslation('translation');
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"

                value={props.date}
                onChange={props.handleDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

function TimeScreen(props) {
    const classes = useStyles();

    return (
        <div className={classes.inputContainer}>
            <div className={classes.time}>
                <TimePicker value={DateTime.local()} handleChange={(e) => {
                    let newly = e.set({ hour: 15, minute: 30 })
                    console.log(newly.toLocaleString(DateTime.DATETIME_FULL))
                }} />
            </div>
            <FormControlLabel
                labelPlacement="start"
                control={
                    <Switch
                        checked={props.allDay}
                        onChange={props.handleAllDay}
                        name="checkedB"
                        color="primary"
                    />
                } label="All-day" />
        </div>
    )
}

function LocationScreen(props) {
    const classes = useStyles();

    return (
        <div className={classes.locationScreen}>
            <TextField className={classes.location}
                id="outlined-basic"
                abel="Location"
                variant="outlined"
                value={props.location}
                onChange={props.handleLocation}
            />
            <FormControlLabel
                labelPlacement="start"
                control={
                    <Switch
                        checked={true}
                        onChange={() => { }}
                        name="not-applicable"
                        color="primary"
                    />
                } label="Not Applicable" />
        </div>
    )
}

function Summary(props) {
    return (
        <div>
            <h1>Confirm and submit</h1>
            <p>{JSON.stringify(props.milestone)}</p>
        </div>
    )
}

const AddMilestones = observer((props) => {

    const [step, setStep] = useState(0);
    const { patientStore, patientUIStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    const handleBack = () => {
        if (step === 0) {
            props.handleBack()
            return
        }
        setStep(step - 1)
    }

    const handleTitle = (e) => {
        patientStore.newMilestone.title = e;
    }

    const handleDate = (e) => {
        patientStore.newMilestone.datetime = e;
    }

    const handleLocation = (e) => {
        patientStore.newMilestone.location = e.target.value;
    }

    const handleAllDay = (e) => {
        patientStore.newMilestone.allDay = e.target.checked;
    }

    //Translated Elements
    const translations = t("milestones.titles", { returnObjects: true });
    const titles = t("patient.addMilestone.titles", { returnObjects: true })


    const tabs = [<ButtonGroup options={translations} handleTitle={handleTitle} />,
    <DateScreen date={patientStore.newMilestone.datetime} handleDate={handleDate} />,
    <TimeScreen time={patientStore.newMilestone.datetime} allDay={patientStore.newMilestone.allDay} handleAllDay={handleAllDay} />,
    <LocationScreen location={patientStore.newMilestone.location} handleLocation={handleLocation} />,
    <Summary milestone={patientStore.newMilestone} />]

    const handleNext = () => {
        if (step == tabs.length - 1) {
            patientUIStore.goToProgress();
            patientStore.postMilestone();
            return
        }
        setStep(step + 1)
    }

    return (
        <>
            <OverTopBar handleBack={handleBack} title={t("patient.addMilestone.barTitle")} />
            <div className={classes.body}>
                <NumberedTitle className={classes.title} number={step + 1} title={titles[step]} />
                <div className={classes.main}>
                    {tabs[step]}
                </div>
                <SimpleButton alignRight className={classes.next} onClick={handleNext}>{t("patient.report.next")}</SimpleButton>
            </div>
        </>
    )
});

const useStyles = makeStyles({
    body: {
        ...Styles.flexColumn,
        alignItems: "center",
        paddingTop: "30px",
    },
    radio: {

    },
    inputContainer: {
        width: "80%",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        borderRadius: "5px",
        padding: "1em",
        ...Styles.flexColumn
    },
    title: {
        width: "90%"
    },
    next: {
        marginTop: "1em",
        marginBottom: "60px"
    },
    time: {
        width: "60%",
        margin: "auto"
    },
    allDay: {
        display: "flex"
    },
    location: {
        width: "80vw"
    },
    locationScreen: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
    },
    main: {
        minHeight: "50vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center"
    }
});


export default AddMilestones;