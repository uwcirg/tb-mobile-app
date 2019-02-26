import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"

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
    border-radius: 0;
    text-decoration: underline;
    font-size: 1rem;
  }
`

const DateCell = styled.div`
  background:       ${(p) => p.medication_report ? green : "none" };
  border: 2px solid ${(p) => p.medication_report ? grey : lightgrey };
  color:            ${(p) => p.medication_report ? darkgrey : white };

  border-radius: 50%;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  height: 2.5rem;
  width: 2.5rem;

  font-size: 1rem;
  font-weight: 700;
  display: block;
  padding-top: 0.5rem;
`

const AdherenceCalendar = observer(({ store }) => (
  <Calendar
    locale={{ "Español": "es", "English": "en" }[store.language]}
    minDetail="year"
    tileContent={
      ({ date, view }) => (
        <DateCell
          date={date}
          medication_report={
            view === 'month' &&
              store.medication_reports.records.find(mr =>
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
