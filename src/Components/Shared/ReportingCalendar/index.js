import React, { useState } from 'react'
import Calendar from 'react-calendar';
import { DateTime } from 'luxon';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import useCalendarStyles from './styles';
import Day from './Day';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import report from '../../../Patient/Walkthrough/ExampleReport';

const ReportingCalendar = observer(({ patient, reports }) => {

    const { uiStore } = useStores();

    const classes = useCalendarStyles();
    const [month, setMonth] = useState(new DateTime.local().startOf('month'))

    const handleChange = (date) => {

    }

    const checkDisabled = (date) => {
        return (
            DateTime.fromJSDate(date) > DateTime.local() ||
            (DateTime.fromJSDate(date).startOf('day') < DateTime.fromISO(patient.treatmentStart).startOf('day')))
    }
    //If desired to disble going past treatment bounds
    // const showLeft = month > DateTime.fromISO(patientStore.treatmentStart).startOf('month');
    // const showRight = month < DateTime.local().startOf('month')
    const showLeft = true;
    const showRight = true;


    console.log(reports)

    return (
        <Calendar
            tileDisabled={({ date }) => {
                return checkDisabled(date)
            }}
            calendarType="US"
            minDetail="month"
            view="month"
            value={new Date()}
            locale={uiStore.locale}
            className={`${classes.calendar} intro-calendar-full`}
            navigationLabel={(
                { date }) => `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(date).get("year")}`
            }
            tileContent={({ date, view }) => {
                const isoDate = DateTime.fromISO(date.toISOString()).toISODate()
                return view === "month"
                    ? <Day dateObj={date}
                        treatmentStart={patient.treatmentStart}
                        report={reports[isoDate]}
                        date={DateTime.fromJSDate(date).day}
                        disabled={checkDisabled(date)} />
                    : null
            }

            }
            next2Label={null}
            prev2Label={null}
            nextLabel={showRight ? <ChevronRight /> : null}
            prevLabel={showLeft ? <ChevronLeft /> : null}
            onChange={handleChange}
            onActiveStartDateChange={(event) => {
                setMonth(DateTime.fromJSDate(event.activeStartDate));
            }}

        />
    )
});

export default ReportingCalendar;
