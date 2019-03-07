import React from "react"

import { darkgrey } from "../colors"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { Icon } from "@mdi/react"
import { mdiCamera } from "@mdi/js"
import Heading from "../primitives/Heading"
import { Paragraph } from "reakit";

import styled from "styled-components"

const StripReports = observer(({ store }) => (
      <div>
        <Fold>
          <Question>
          <Icon size="1.5rem" color={darkgrey} path={mdiCamera} /> {store.translate("progress.test_result")}
          </Question>

          { store.registration.information.strip_reports.length === 0
            ? <Answer>
                <P>2019/03/20 - Unclear / Not Yet Confirmed</P>
                <P>2019/03/19 - Confirmed</P>
                <P>2019/03/18 - Confirmed</P>
                <P>2019/03/17 - No Photo Submitted</P>
              </Answer>

            : store.registration.information.strip_reports.map(({created_at, photo, status}) => (
              <Answer>
                <P key={created_at}>{DateTime
                .fromISO(created_at)
                .toLocaleString(DateTime.DATETIME_SHORT)
                 + ": " + status + "\n" + photo}</P>
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

export default StripReports;
