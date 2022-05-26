import React from 'react'
import { DateTime } from 'luxon';
import useCalendarStyles from './styles';
import CalendarDayStyleHelper from './styleHelper';
import Colors from '../../../../Basics/Colors';

const getSurroundingDates = (datetime) => {
    return [datetime.startOf('day').minus({ days: 1 }),
    datetime.startOf('day'),
    datetime.startOf('day').plus({ days: 1 })]
}

const Day = ({ dateObj, reports, treatmentStart, disabled, date }) => {

    const classes = useCalendarStyles();
    const datetime = DateTime.fromJSDate(dateObj);

    const getReportColorForDate = (date) => {
        const isWithinTreatmentBounds = date.diff(DateTime.fromISO(DateTime.fromISO(treatmentStart).toISODate()), "days").days >= 0 && datetime.diffNow("days").days < 0;

        const report = reports[date.toISODate()]

        if (isWithinTreatmentBounds) {
            const isToday = date.equals(DateTime.local().startOf('day'));

            if (!report && !isToday) {
                return Colors.calendarRed
            }

            if (report && report.medicationWasTaken) {
                return Colors.calendarGreen
            }
        }
        return "white"
    }

    const getRelevantReportColors = () => {
        const [prevDate, currentDate, nextDate] = getSurroundingDates(datetime);
        return [getReportColorForDate(prevDate), getReportColorForDate(currentDate), getReportColorForDate(nextDate)]
    }

    const [prevColor, currentColor, nextColor] = getRelevantReportColors(datetime);

    const relevantDay = new CalendarDayStyleHelper(reports[datetime.toISODate()], { prevColor, currentColor, nextColor })
    const isToday = datetime.toISODate() === DateTime.local().toISODate();

    return (<div style={{ backgroundColor: currentColor }} className={`${classes.day} ${!disabled && classes.nonDisabledDay} ${relevantDay.rightRounding && classes.end} ${relevantDay.leftRounding && classes.start}`}>
        <p className={`${isToday && classes.today}`}>{date}</p>
        <div className={classes.bottomDots}>
            {relevantDay.modifiers.map(each => <div key={`${datetime.toISODate}-mod-${each}`} style={{ backgroundColor: each }} className={classes.modifier} />)}
        </div>
    </div>)
};

export default Day;