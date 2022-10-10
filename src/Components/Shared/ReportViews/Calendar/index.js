import React from "react";
import ReactCalendar from "react-calendar";
import { DateTime } from "luxon";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";
import useCalendarStyles from "./styles";
import Day from "./Day";
import useStores from "../../../../Basics/UseStores";
import { observer } from "mobx-react";

const Calendar = observer(
  ({ patient, reports, handleDateChange, displayStartDate, updateMonth }) => {
    const { uiStore } = useStores();

    const classes = useCalendarStyles();

    const handleChange = (date) => {
      handleDateChange(DateTime.fromJSDate(date).toISODate());
    };

    const checkDisabled = (date) => {
      return (
        DateTime.fromJSDate(date) > DateTime.local() ||
        DateTime.fromJSDate(date).startOf("day") <
          DateTime.fromISO(patient.treatmentStart).startOf("day")
      );
    };

    return (
      <ReactCalendar
        activeStartDate={displayStartDate}
        tileDisabled={({ date }) => {
          return checkDisabled(date);
        }}
        calendarType="US"
        minDetail="month"
        view="month"
        locale={uiStore.locale}
        className={`${classes.calendar} intro-calendar-full`}
        navigationLabel={({ date }) =>
          `${DateTime.fromJSDate(date).get("monthLong")} ${DateTime.fromJSDate(
            date
          ).get("year")}`
        }
        tileContent={({ date, view }) => {
          return view === "month" ? (
            <Day
              dateObj={date}
              treatmentStart={patient.treatmentStart}
              reports={reports}
              date={DateTime.fromJSDate(date).day}
              disabled={checkDisabled(date)}
            />
          ) : null;
        }}
        next2Label={null}
        prev2Label={null}
        nextLabel={<ArrowRight className={classes.calendarButton} />}
        prevLabel={<ArrowLeft className={classes.calendarButton} />}
        onChange={handleChange}
        onActiveStartDateChange={({ action }) => {
          updateMonth(action === "next");
        }}
      />
    );
  }
);

export default Calendar;
