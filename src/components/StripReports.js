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

const StripReports = observer(({ assembly }) => (
      <div>
        <Fold>
          <Question>
            <Icon size="1.5rem" color={darkgrey} path={mdiCamera} />
            {assembly.translate("progress.test_result")}
          </Question>

          { assembly.participant_account.information.strip_reports.length === 0
            ? <Answer>
                <Info>{assembly.translate("progress.no_strip_reports")}</Info>
              </Answer>

            : assembly
                .participant_account
                .information.strip_reports
                .sort(function(a,b){
                  // Turn your strings into dates, and then subtract them
                  // to get a value that is either negative, positive, or zero.
                  return new Date(a.created_at) - new Date(b.created_at);
                })
                .map(({created_at, photo, status}) => (
              <Answer>
                <Time key={created_at}>
                  {DateTime.fromISO(created_at).toLocaleString(DateTime.DATETIME_SHORT)}
                </Time>
                <Info>
                  {status || assembly.translate("progress.not_reviewed")}
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
