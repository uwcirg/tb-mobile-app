import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
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

          { view === 'month' &&
            store.events.find(e =>
              e.date.unix() === moment(date).unix() &&
              e.type === "questionnaire_response" &&
              e.questionnaire_name === "self_report"
            )
              ? <Icon size="1rem" color={darkgrey} path={mdiPill} />
              : <Icon />
          }

          { view === 'month' &&
            store.events.find(e =>
              e.date.unix() === moment(date).unix() &&
              e.type === "questionnaire_response" &&
              e.questionnaire_name === "symptoms"
            )
              ? <Icon size="1rem" color={darkgrey} path={mdiFormatListChecks} />
              : <Icon />
          }

          { view === 'month' &&
            store.events.find(e =>
              e.date.unix() === moment(date).unix() &&
              e.type === "observation"
            )
              ? <Icon size="1rem" color={darkgrey} path={mdiCamera} />
              : <Icon />
          }
        </DateWrapper>
    }
    onClickDay={(date) => store.reportMedication(date)}
    tileDisabled={(date) => date > new Date()}
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
    margin-bottom: 1rem;
  }
`

const DateNumber = styled.span`
  color: ${darkgrey};
`

export default Calendar;
