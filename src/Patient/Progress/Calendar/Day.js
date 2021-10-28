import React from 'react'
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';
import CalendarDayStyleHelper from './styleHelper';
import Colors from '../../../Basics/Colors';

const getSurroundingDates = (datetime) => {
    return [datetime.startOf('day').minus({days: 1}),
        datetime.startOf('day'),
        datetime.startOf('day').plus({days: 1}) ]
}

const Day = observer((props) => {
    const classes = useCalendarStyles();
    const { patientStore } = useStores();

    const datetime = DateTime.fromJSDate(props.dateObj);

    const getReportColorForDate = (date) => {
        const isWithinTreatmentBounds = date.diff(DateTime.fromISO(DateTime.fromISO(patientStore.treatmentStart).toISODate()), "days").days >= 0 && datetime.diffNow("days").days < 0;

        if(isWithinTreatmentBounds){
            const report = patientStore.savedReports[date.toISODate()]
            const isToday = date.equals(DateTime.local().startOf('day'));

            if(!report && !isToday){
                return Colors.calendarRed
            }

            if(report && report.medicationWasTaken){
                return Colors.calendarGreen
            }
        }
        return "white"
    }

    //Day shown as "selected" in blue on calendar
    const selectedDay = datetime.startOf('day').equals(DateTime.fromISO(patientStore.uiState.selectedCalendarDate));

    const getRelevantReportColors = () => {
        const [prevDate,currentDate,nextDate] = getSurroundingDates(datetime);
        return [ getReportColorForDate(prevDate), getReportColorForDate(currentDate), getReportColorForDate(nextDate)]
    }

    const [prevColor,currentColor,nextColor] = getRelevantReportColors(datetime);

    const relevantDay = new CalendarDayStyleHelper(patientStore.savedReports[datetime.toISODate()],{prevColor,currentColor,nextColor})

    return (
        <div style={{ backgroundColor: currentColor}} className={`${classes.day} ${relevantDay.rightRounding && classes.end} ${relevantDay.leftRounding && classes.start}`}>
            {selectedDay ? <div className={classes.selectedDay}><p>{props.date}</p> </div> : <p>{props.date}</p>}
            <div className={classes.bottomDots}>
                {relevantDay.modifiers.map(each => <div key={`${datetime.toISODate}-mod-${each}`} style={{ backgroundColor: each }} className={classes.modifier} />)}
            </div>
        </div>
    )
});

export default Day;