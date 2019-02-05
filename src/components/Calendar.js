import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"

import { darkgrey, grey, white, green } from "../colors"

const Calendar = observer(({ store }) => (
  <CalendarComponent
    minDetail="year"
    tileContent={
      ({ date, view }) => (
        <DateCell
          date={date}
          medication_report={view === 'month' && date < new Date() }
        >
          {date.getDate()}
        </DateCell>
    )}
  />
))

const CalendarComponent = styled(ReactCalendar)`
  width: 100% !important;
  background: none !important;
  border: none !important;
  overflow: hidden !important;

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
  background:       ${(p) => p.date < new Date() ? green : "none" };
  ${p => p.date < new Date() && `border: 2px solid ${white}`}
  color:            ${(p) => p.date < new Date() ? white : darkgrey };

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

export default Calendar;
