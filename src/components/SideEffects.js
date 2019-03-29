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

      { (
        assembly
          .participant_account
          .information
          .symptom_reports
        || []
        ).length === 0

      ? <Answer>
          <Info>{assembly.translate("progress.no_side_effects")}</Info>
        </Answer>

      : (
        assembly
          .participant_account
          .information
          .symptom_reports
        || []
        )
        .slice()
        .sort((a,b) => DateTime.fromISO(b.timestamp) - DateTime.fromISO(a.timestamp))
        .map(sr => (
          <Answer key={sr.created_at}>
            <Time>
              { DateTime
                .fromISO(sr.timestamp, {zone: 'utc'})
                .setLocale(assembly.locale)
                .toLocaleString(DateTime.DATETIME_SHORT)
              }
            </Time>

            { sr.reported_symptoms.length !== 0

            ? <Info>
                {sr
                  .reported_symptoms
                  .map(symptom_key => (
                    <span>
                      {assembly.translate(`survey.symptoms.${symptom_key}`)}
                    </span>
                  ))
                }
                { sr.nausea_rating ? sr.nausea_rating : null }
                { sr.other }
              </Info>

            : <Info>
                {assembly.translate("progress.no_side_effects")}
              </Info>
            }
          </Answer>
        ))
      }
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
