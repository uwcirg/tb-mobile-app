import React from 'react'
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';
import CalendarDayStyleHelper from './styleHelper';

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

export default Day;