import React from 'react'
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import useStores from '../../../Basics/UseStores';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { observer } from 'mobx-react'
import useCalendarStyles from './styles';
import Day from './Day';

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

export default CustomCalendar;
