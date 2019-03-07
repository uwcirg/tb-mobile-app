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
          {/* TODO: Figure out how to add vertical alignment for these icons */}
        <Icon size="1.5rem" color={darkgrey} path={mdiPill} /> {store.translate("progress.medication")}
        </Question>

        { store.registration.information.medication_reports.length === 0
          ? <Answer>
              <P>No Medication Reports</P>
              <P>2019/03/20 - Yes</P>
              <P>2019/03/19 - Yes</P>
              <P>2019/03/18 - Yes</P>
              <P>2019/03/17 - No</P>
            </Answer>

          : store.registration.information.medication_reports.map(({timestamp, id}) => (
            
            // TODO: Sort by date and link reports
            <Answer>
              <P key={id}>{DateTime.fromISO(timestamp).toLocaleString(DateTime.DATETIME_SHORT)}</P>
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

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

export default MedicationReports;
