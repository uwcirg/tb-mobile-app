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

const MedicationReports = observer(({ store }) => (
      <div>
        <Fold>

        <Question>
        <Icon size="1.5rem" color={darkgrey} path={mdiPill} /> {store.translate("progress.medication")}
        </Question>

        { store.registration.information.medication_reports.length === 0
          ? <Answer>
              {/* TODO: Translate */}
              <Info>No Medication Reports</Info>
            </Answer>

          : store.registration.information.medication_reports.map(({timestamp, id, took_medication,
            not_taking_medication_reason}) => (
            
            // TODO: Sort by date and link reports
            <Answer>
              <Time key={id}>{DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</Time>
              <Info key={took_medication}>Took Medication: {took_medication && "Yes"} {!took_medication && "No, I reported \"" + not_taking_medication_reason + "\""}</Info>
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
