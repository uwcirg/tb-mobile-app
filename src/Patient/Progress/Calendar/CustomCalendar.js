import React from 'react'
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';


const CustomCalendar = observer(() => {

    const classes = useCalendarStyles();
    const { patientStore, uiStore } = useStores();

    const handleChange = (date) => {
        patientStore.uiState.selectedCalendarDate = DateTime.fromJSDate(date).toISODate();
    }

    const checkDisabled = (date) => {
        return (
            DateTime.fromJSDate(date) > DateTime.local() ||
            (DateTime.fromJSDate(date).startOf('day') < DateTime.fromISO(patientStore.treatmentStart).startOf('day')))
    }

    return (
        <Calendar
            tileDisabled={({ date }) => {
                return checkDisabled(date)
            }}
            calendarType="US"
            minDetail="month"
            view="month"
            onChange={() => { }}
            value={new Date()}
            locale={uiStore.locale}
            className={`${classes.calendar} intro-calendar-full`}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => (
                view === "month"
                    ? <Day dateObj={date} date={DateTime.fromJSDate(date).day} disabled={checkDisabled(date)} />
                    : null
            )}
            next2Label={null}
            prev2Label={null}
            nextLabel={<ChevronRight />}
            prevLabel={<ChevronLeft />}
            onChange={handleChange}
        />
    )
});

const Day = observer((props) => {
    const classes = useCalendarStyles();
    const { patientStore } = useStores();

    let dt = DateTime.fromJSDate(props.dateObj);

    let compositeClass;

    //Day shown as "selected" in blue on calendar
    const selectedDay = dt.startOf('day').equals(DateTime.fromISO(patientStore.uiState.selectedCalendarDate));
    const selectedDayIsValid = dt.diff(DateTime.fromISO(patientStore.treatmentStart), "days").days >= 0


    //Check to ensure the date is before the treatment end date so if a patient logs in after a while they 
    //wont have tons of red on their calendar for dates they cant report for
    const afterAppEndFn = () => {
        if(!patientStore.treatmentOutcome || !patientStore.treatmentOutcome.appEndDate){return false}
        return dt.startOf('day') > DateTime.fromISO(patientStore.treatmentOutcome.appEndDate).startOf('day')
    }

    const afterAppEnd = afterAppEndFn();

    let modifier = false;
    let symptom = false;

    const dayBefore = patientStore.savedReports[`${dt.startOf('day').minus(1, 'day').toISODate()}`]
    const dayFromServer = patientStore.savedReports[`${dt.startOf('day').toISODate()}`]
    const dayAfter = patientStore.savedReports[`${dt.endOf('day').plus(1, 'day').toISODate()}`]

    const today = dt.startOf('day').equals(DateTime.local().startOf('day'));
    const start = dt.startOf('day').equals(DateTime.fromISO(patientStore.treatmentStart).startOf('day'));

    if (selectedDayIsValid) {
        if (dayFromServer && dayFromServer.medicationWasTaken) { compositeClass += ' ' + classes.positive }
        else if (dayFromServer && !dayFromServer.medicationWasTaken) { modifier = "red" }
        else if (!dayFromServer && !props.disabled && !today && !afterAppEnd) { compositeClass += ' ' + classes.negative }

        if (dayBefore && dayAfter && dayFromServer) {
            if (dayBefore.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.start;
            if (dayAfter.medicationWasTaken != dayFromServer.medicationWasTaken) compositeClass += ' ' + classes.end;
            if (dayFromServer.medicationWasTaken && !dayBefore.medicationWasTaken && !dayAfter.medicationWasTaken) compositeClass += ' ' + classes.single;
        }

        if ((dayFromServer && !dayAfter) || (!dayFromServer && dayAfter) || today) compositeClass += ' ' + classes.end;
        if ((dayFromServer && !dayBefore) || (!dayFromServer && dayBefore) || start) compositeClass += ' ' + classes.start;

        if (dayFromServer && dayFromServer.symptoms.length > 0) symptom = true
    }

    return (
        <div className={`${classes.day} ${compositeClass}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            <div className={classes.bottomDots}>
                {modifier ? <div className={classes.modifier}> </div> : ""}
                {symptom ? <div style={{ backgroundColor: Colors.yellow }} className={classes.modifier}> </div> : ""}
            </div>
        </div>
    )
});

const DemoDay = (props) => {
    const classes = useCalendarStyles();

    return (
        <div style={{ width: "40px", height: "40px" }} className={`${classes.day} ${classes.single} ${!props.modifier && (props.tookMedication ? classes.positive : classes.negative)}`}>
            <p>{props.date}</p>
            {props.modifier ? <div style={props.symptom && { backgroundColor: Colors.yellow }} className={classes.modifier}> </div> : ""}
        </div>
    )
}

export default CustomCalendar;
export { DemoDay };