import React from 'react'
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';

class CalendarDay {
    modifiers = [];
    color = "white";

    constructor(report,datetime) {
        this.color = this.getColor(report,datetime);
        if (report) {
            this.modifier = this.getModifier(report);
        }
    }

    getModifier(report) {
        if (!report.medicationWasTaken) {
            this.modifiers.push("red")
        }

        if (report.symptoms && report.symptoms.length > 0) {
            this.modifiers.push("yellow")
        }
    }

    getColor(object,datetime) {
        const isToday = datetime.startOf('day').equals(DateTime.local().startOf('day'));
        if(!object){
            return isToday ? "white" : Colors.calendarRed;
        }
        if (object.medicationWasTaken) return Colors.calendarGreen

    }

}


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
    const selectedDayIsValid = dt.diff(DateTime.fromISO(patientStore.treatmentStart), "days").days >= 0 && dt.diffNow("days").days < 0



    const dayBefore = new CalendarDay(patientStore.savedReports[`${dt.startOf('day').minus(1, 'day').toISODate()}`], dt)
    const dayFromServer = new CalendarDay(patientStore.savedReports[`${dt.startOf('day').toISODate()}`],dt)
    const dayAfter = new CalendarDay(patientStore.savedReports[`${dt.endOf('day').plus(1, 'day').toISODate()}`],dt)

    const today = dt.startOf('day').equals(DateTime.local().startOf('day'));
    const start = dt.startOf('day').equals(DateTime.fromISO(patientStore.treatmentStart).startOf('day'));

    if (dayBefore.color != dayFromServer.color) compositeClass += ' ' + classes.start;
    if (dayAfter.color != dayFromServer.color) compositeClass += ' ' + classes.end;

    return (
        <div style={{ backgroundColor: selectedDayIsValid ? dayFromServer.color : "white" }} className={`${classes.day} ${compositeClass}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            <div className={classes.bottomDots}>
                {dayFromServer.modifiers.map(each => <div key={`${dt.toISODate}-mod-${each}`} style={{ backgroundColor: each }} className={classes.modifier} />)}
            </div>
        </div>
    )
});

//TODO: Fix this
const DemoDay = (props) => {
    const classes = useCalendarStyles();

    return (
        <div style={{ width: "40px", height: "40px" }} style={{ backgroundColor: dayFromServer.color }} className={classes.day}>
            <p>{props.date}</p>
            {props.modifier ? <div style={props.symptom && { backgroundColor: Colors.yellow }} className={classes.modifier}> </div> : ""}
        </div>
    )
}

export default CustomCalendar;
export { DemoDay };