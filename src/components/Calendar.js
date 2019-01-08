import React from "react";
import styled from "styled-components"
import { observer, Observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import moment from "moment"

import { lightgrey, darkgrey, grey, white } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

const Calendar = observer(({ store }) => (
  <CalendarComponent
    minDetail="year"
    tileContent={({ date, view }) =>
        <DateWrapper>
          <DateNumber>{date.getDate()}</DateNumber>

          <Observer>
            { () => (
              view === 'month' && store.medication_reports.find(e =>
                e.date.unix() === moment(date).unix()
              )
              ? <Icon size="1rem" color={darkgrey} path={mdiPill} />
              : <Placeholder />
            ) }
          </Observer>

          <Observer>
            { () => (
              view === 'month' && store.symptom_reports.find(e =>
                e.date.unix() === moment(date).unix()
              )
                ? <Icon size="1rem" color={darkgrey} path={mdiFormatListChecks} />
                : <Placeholder />
            ) }
          </Observer>

          <Observer>
            { () => (
              view === 'month' && store.strip_reports.find(e =>
                e.date.unix() === moment(date).unix()
              )
                ? <Icon size="1rem" color={darkgrey} path={mdiCamera} />
                : <Placeholder />
            ) }
          </Observer>
        </DateWrapper>
    }
  />
))

const DateWrapper = styled.div`
  display: grid;
  grid-column-gap: 5%;
  grid-row-gap: 5%;
  padding: 5%;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
`

const CalendarComponent = styled(ReactCalendar)`
  width: 100% !important;

  & .react-calendar__tile {
    background-color: ${white};
    border: 1px solid ${lightgrey};
    height: 4rem;
    padding: 0;
  }

  & .react-calendar__tile time { display: none; }

  & .react-calendar__tile--now {
    background-color: ${grey};
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: ${grey}
  }

  & .react-calendar__navigation button {
    background-color: ${white};
    border-radius: 0;
    border: 1px solid ${grey};
    font-size: 1rem;
    padding: 0.5rem;
  }
`

const DateNumber = styled.span`
  color: ${darkgrey};
`

const Placeholder = styled.div`
`

export default Calendar;
