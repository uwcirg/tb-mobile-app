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
    tileContent={
      ({ date, view }) => {
        let survey_for_day =
          view === "month" &&
          (
            assembly
              .participant_account
              .information
              .medication_reports
            || []
          ).find(mr =>mr.timestamp.replace(/T.+$/, "") === date.toJSON().replace(/T.+$/, ""));
          
        
        if (survey_for_day) {
          return (
            <DateCell date={date} took_medication={survey_for_day.took_medication}>
              {date.getDate()}
            </DateCell>
          )
        } else {
          return (
            <UnreportedDate date={date}>
              {date.getDate()}
            </UnreportedDate>
          )
        }
      }
    }
  />
))

export default AdherenceCalendar;

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
  background:       ${(p) => p.took_medication ? green : red };
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

const UnreportedDate = styled.div`
  border: 2px solid lightgrey

  border-radius: 50%;
  margin-bottom: 0.5rem;
  height: 2.0rem;
  width: 2.0rem;

  font-size: 1rem;
  font-weight: 700;
  display: block;
  padding-top: 0.5rem;
`
