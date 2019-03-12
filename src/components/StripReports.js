import React from "react"

import { darkgrey } from "../colors"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { Icon } from "@mdi/react"
import { mdiCamera } from "@mdi/js"
import Heading from "../primitives/Heading"
import { Image } from "reakit";

import styled from "styled-components"

const StripReports = observer(({ store }) => (
      <div>
        <Fold>
          <Question>
          <Icon size="1.5rem" color={darkgrey} path={mdiCamera} /> {store.translate("progress.test_result")}
          </Question>

          { store.registration.information.strip_reports.length === 0
            ? <Answer>
                {/* TODO: Need translation */}
                <Info>No Strip Reports Submitted</Info>
              </Answer>

            : store.registration.information.strip_reports.map(({created_at, photo, status}) => (
              <Answer>
                <Time key={created_at}>{DateTime
                  .fromISO(created_at)
                  .toLocaleString(DateTime.DATETIME_SHORT)}
                </Time>
                <Info>
                  {/* TODO: Need translations */}
                  {status || "Not Reviewed Yet"}
                </Info>
                <Image src={photo}>
                </Image>
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
  margin-top: 0.5rem;
`

const Info = styled.div`
  word-wrap: break-word;
`

export default StripReports;
