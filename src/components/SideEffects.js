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

const SideEffects = observer(({ assembly }) => (
  <div>
    <Fold>
      <Question>
        <Icon size="1.5rem" color={darkgrey} path={mdiFormatListChecks} />
        {assembly.translate("progress.side_effect")}
      </Question>

      { assembly.registration.information.symptom_reports.length === 0
        ? <Answer>
            <Info>{assembly.translate("progress.no_side_effects")}</Info>
          </Answer>

        : assembly.registration.information.symptom_reports.map((sr) => (
          // TODO: Sort by date and link reports
          <Answer key={sr.created_at}>
            <Time>
              { DateTime
                .fromISO(sr.created_at)
                .toLocaleString(DateTime.DATETIME_SHORT)
              }
            </Time>

            { sr.reported_symptoms.length !== 0

            ? <Info>
                { sr
                  .reported_symptoms
                  .map(symptom_key => assembly.translate(`survey.symptoms.${symptom_key}`))
                  .join(", ")}

                { sr.nausea_rating }
                { sr.other }
              </Info>

            : <Info>
                {assembly.translate("progress.no_side_effects")}
              </Info>
            }
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
