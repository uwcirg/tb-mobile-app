import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import Survey from "./Survey"
import { DateTime } from "luxon"

import { lightgrey, darkgrey, grey, white, green, red } from "../colors"

const AdherenceCalendar = observer(({ assembly }) => (
  <Calendar
    locale={{ "Español": "es", "English": "en" }[assembly.language]}
    minDetail="year"

    tileDisabled={({date}) => {
      return (DateTime.fromJSDate(date) > DateTime.local())}
    }

    // Use https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
    // if you need to format the date again
    // React calendar returns this format of date "Fri Mar 29 2019 00:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)"
    onClickDay={((value) => assembly.survey_date =
                           DateTime
                            .fromFormat(value.toString().substr(0, 15), 'EEE LLL dd yyyy')
                            .setLocale(assembly.locale)
                            .toLocaleString(DateTime.DATE_SHORT))}

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

  return (
    medication_report
    ? medication_report.took_medication
      ? <TookMedication date={date} >
          {date.getDate()}
        </TookMedication>

      : <DidNotTakeMedication date={date} >
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

export default AdherenceCalendar;
