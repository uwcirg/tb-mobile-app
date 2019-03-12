import React from "react"

import { darkgrey } from "../colors"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { Icon } from "@mdi/react"
import { mdiFormatListChecks } from "@mdi/js"
import Heading from "../primitives/Heading"
import { Paragraph } from "reakit";

import styled from "styled-components"

const SideEffects = observer(({ store }) => (
      <div>
        <Fold>
          <Question>
          <Icon size="1.5rem" color={darkgrey} path={mdiFormatListChecks} /> {store.translate("progress.side_effect")}
          </Question>

          { store.registration.information.symptom_reports.length === 0
            ? <Answer>
                {/* TODO: Translate this piece */}
                <Info>No Side Effects Reported</Info>
              </Answer>

            : store.registration.information.symptom_reports.map(({created_at, reported_symptoms}) => (
              
              // TODO: Sort by date and link reports
              <Answer>
                <Time key={created_at}>{DateTime
                .fromISO(created_at)
                .toLocaleString(DateTime.DATETIME_SHORT)}</Time>
                {reported_symptoms.length !== 0 ? 
                <Info key={reported_symptoms}>{reported_symptoms.join(", ")}</Info>
                  // TODO: Translations
                : <Info>N/A</Info>}
              </Answer>
          ))}
        </Fold>
      </div>
))

const Answer = styled.div`
`

const Question = styled(Heading)`
  font-weight: 100;
  margin: 0;
  display: flexbox;
  align-items: center;
`

const Time = styled.div`
  margin-bottom: 0.25;
`

const Info = styled(Paragraph)`
  margin-bottom: 1rem;
  word-wrap: break-word;
`

export default SideEffects;
