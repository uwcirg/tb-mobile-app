import React from 'react'
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import Colors from '../../../Basics/Colors';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';
import CalendarDayStyleHelper from './styleHelper';

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

    let datetime = DateTime.fromJSDate(props.dateObj);
    const isToday = datetime.startOf('day').equals(DateTime.local().startOf('day'));
    const isWithinTreatmentBounds = datetime.diff(DateTime.fromISO(patientStore.treatmentStart), "days").days >= 0 && datetime.diffNow("days").days < 0;

    //Day shown as "selected" in blue on calendar
    const selectedDay = datetime.startOf('day').equals(DateTime.fromISO(patientStore.uiState.selectedCalendarDate));
    
    const relevantDay = new CalendarDayStyleHelper({
        previous: patientStore.savedReports[`${datetime.startOf('day').minus(1, 'day').toISODate()}`],
        current: patientStore.savedReports[`${datetime.startOf('day').toISODate()}`],
        next: patientStore.savedReports[`${datetime.endOf('day').plus(1, 'day').toISODate()}`]
    }, isToday)

    return (
        <div style={{ backgroundColor: isWithinTreatmentBounds ? relevantDay.color : "white" }} className={`${classes.day} ${relevantDay.rightRounding && classes.end} ${relevantDay.leftRounding && classes.start}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            <div className={classes.bottomDots}>
                {relevantDay.modifiers.map(each => <div key={`${datetime.toISODate}-mod-${each}`} style={{ backgroundColor: each }} className={classes.modifier} />)}
            </div>
        </div>
    )
});

export default CustomCalendar;
