import React from "react"

import { darkgrey } from "../colors"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { Icon } from "@mdi/react"
import { mdiPill } from "@mdi/js"
import Heading from "../primitives/Heading"
import { Paragraph } from "reakit";

import styled from "styled-components"

const MedicationReports = observer(({ assembly }) => (
  <div>
    <Fold>

    <Question>
      <Icon size="1.5rem" color={darkgrey} path={mdiPill} />
      {assembly.translate("progress.medication")}
    </Question>

    { assembly.participant_account.information.medication_reports.length === 0
    ? <Answer>
        <Info>{assembly.translate("progress.no_medication_reports")}</Info>
      </Answer>

    : assembly
      .participant_account
      .information
      .medication_reports
      .map(({timestamp, id, took_medication, not_taking_medication_reason}) => (
        // TODO: Sort by date and link reports
        <Answer>
          <Time key={id}>{DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</Time>

          <Info key={took_medication}>
            {assembly.translate("progress.took_medication")}

            { took_medication
            ? assembly.translate("progress.took_medication_yes")
            : assembly.translate("progress.took_medication_no") +
              not_taking_medication_reason
            }
          </Info>
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
`

export default MedicationReports;
