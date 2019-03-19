import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import Survey from "./Survey"
import { DateTime } from "luxon"

import { lightgrey, darkgrey, grey, white, green } from "../colors"

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
  background:       ${(p) => p.medication_report ? green : "none" };
  background:       ${(p) => p.medication_report ? green : "none" };
  border: 2px solid ${(p) => p.medication_report ? grey : lightgrey };
  color:            ${(p) => p.medication_report ? darkgrey : white };

  border-radius: 50%;
  margin-bottom: 0.5rem;
  height: 2.0rem;
  width: 2.0rem;

  font-size: 1rem;
  font-weight: 700;
  display: block;
  padding-top: 0.5rem;
`

const AdherenceCalendar = observer(({ assembly }) => (
  <Calendar
    locale={{ "Español": "es", "English": "en" }[assembly.language]}
    minDetail="year"
    // onClickDay={(value) => console.log('Clicked day: ', value)}
    // DateTime.local().setLocale(this.locale).toISODate();
    // Fri Mar 22 2019 00:00:00 GMT-1000 (Hawaii-Aleutian Standard Time)
    onClickDay={(value) => assembly.survey_date = 
                           DateTime.fromFormat(value.toString().substr(0, 15), 'EEE LLL dd yyyy').toISODate()}

    tileContent={
      ({ date, view }) => (
        <DateCell
          date={date}
          medication_report={
            view === 'month' &&
              assembly.participant_account.information.medication_reports.find(mr =>
                mr.timestamp.replace(/T.+$/, "") === date.toJSON().replace(/T.+$/, "")
              )
          }
        >
          {date.getDate()}
        </DateCell>
      )}
    />
))

export default AdherenceCalendar;
