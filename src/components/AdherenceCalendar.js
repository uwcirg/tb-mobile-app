import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import Survey from "./Survey"
import { DateTime } from "luxon"

import { lightgrey, darkgrey, grey, white, green, red, blue, black } from "../colors"

const AdherenceCalendar = observer(({ assembly }) => (
  <Calendar
    locale={{ "Español": "es", "English": "en" }[assembly.language]}
    minDetail="month"
    tileDisabled={({date}) => {
      return (DateTime.fromJSDate(date) > DateTime.local())}
    }
    onClickDay={ (value) =>
      // React calendar formats dates as:
      // "Fri Mar 29 2019 00:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)"
      // https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
      assembly.survey.date = DateTime.fromFormat(
        value.toString().substr(0, 15),
        'EEE LLL dd yyyy',
      )
        .setLocale(assembly.locale)
        .toLocaleString(DateTime.DATE_SHORT)
    }
    onChange={() => assembly.currentPage = Survey}
    tileContent={({ date, view }) => (
      view === "month"
      ? <Date date={date} assembly={assembly} />
      : null
    )}
  />
))

const Date = observer(({date, assembly}) => {
  let medication_report = (
    assembly
      .participant_account
      .information
      .medication_reports
    || []
  ).find(report => (
    DateTime.fromISO(report.timestamp).toISODate()
    ===
    DateTime.fromISO(date.toISOString()).toISODate()
  ))

  let isItToday = DateTime.local().toISODate() === DateTime.fromISO(date.toISOString()).toISODate()

  if (isItToday) {
    if (medication_report && medication_report.took_medication) {
      return (
        <TodaysDateReported date={date}>
          {date.getDate()}
        </TodaysDateReported>
      )
    } else {
      return (
        <TodaysDateNotReported date={date}>
          {date.getDate()}
        </TodaysDateNotReported>
      )
    }
  }

  return (

    medication_report
    ? medication_report.took_medication
      ? <TookMedication date={date}>
          {date.getDate()}
        </TookMedication>

      : <DidNotTakeMedication date={date}>
          {date.getDate()}
        </DidNotTakeMedication>

    : <UnreportedDate date={date}>
        {date.getDate()}
      </UnreportedDate>
  )
})

const Calendar = styled(ReactCalendar)`
  width: 100% !important;
  background: none !important;
  border: none !important;
  overflow: hidden !important;

  & .react-calendar__tile {
    padding: 0;
  }

  & .react-calendar__tile time {
    display: none;
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: ${grey}
  }

  & .react-calendar__navigation button {
    text-decoration: underline;
    font-size: 1.2rem;
    color: ${black}
  }

  & button.react-calendar__navigation__arrow.react-calendar__navigation__prev2-button {
    display: none;
  }

  & button.react-calendar__navigation__arrow.react-calendar__navigation__next2-button {
    display: none;
  }

  & button {
    background: none;
    border: none;
  }
`

const DateCell = styled.div`
  border-radius: 50%;
  margin-bottom: 0.5rem;
  height: 2.0rem;
  width: 2.0rem;

  font-size: 1rem;
  font-weight: 700;
  display: block;
  padding-top: 0.5rem;
`

const TookMedication = styled(DateCell)`
  background-color: ${green};
  border: 2px solid ${white};
  color: ${white};
`

const DidNotTakeMedication = styled(DateCell)`
  background-color: ${red};
  border: 2px solid ${white};
  color: ${darkgrey};
`

const UnreportedDate = styled(DateCell)`
  border: 2px solid ${lightgrey};
`

const TodaysDateNotReported = styled(DateCell)`
  border: 2px solid ${lightgrey};
  color: ${red};
`

const TodaysDateReported = styled(DateCell)`
  background-color: ${green};
  border: 2px solid ${white};
  color: ${red};
`

export default AdherenceCalendar;
