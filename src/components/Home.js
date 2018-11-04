import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import ReactCalendar from "react-calendar/dist/entry.nostyle"
import moment from "moment"

import { grey } from "../colors"

import {
  CameraIcon,
  FormatListChecksIcon,
} from "mdi-react"

const Home = observer(({ store }) => (
  <Layout>
    <h1>
      ¡Bienvenido!
    </h1>

    <p>
      Prima un dato para recordar tomando su medicación.
    </p>

    <Calendar
      calendarType="US"
      minDetail="year"
      tileContent={({ date, view }) =>
        <IconWrapper>
          { view === 'month' &&
            store.events.indexOf({ date: moment(date), type: "observation" }) !== -1
            ? <CameraIcon />
            : null
          }
          { view === 'month' &&
            store.events.indexOf({ date: moment(date), type: "questionnaire_response" }) !== -1
              ? <FormatListChecksIcon />
            : null
          }
        </IconWrapper>
      }
      onClickDay={(date) => store.reportMedication(date)}
      tileDisabled={(date) => date > new Date()}
    />
  </Layout>
))

const Layout = styled.div`
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1rem;
`

const Calendar = styled(ReactCalendar)`
  & .react-calendar__tile {
    border: 1px solid ${grey};
    height: 4rem;
  }

  & .react-calendar__tile--now {
    background-color: ${grey};
  }

  & .react-calendar__month-view__days__day--neighboringMonth {
    color: ${grey}
  }

  & .react-calendar__navigation button {
    border-radius: 0;
    border: 1px solid ${grey};
    font-size: 1rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
`

Home.route = "/"
export default Home;
