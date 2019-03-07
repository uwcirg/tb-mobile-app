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
                <P>2019/03/20 - Nausea</P>
                <P>2019/03/19 - Redness, Nausea, Appetite loss</P>
                <P>2019/03/18 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim et alias nam obcaecati molestias expedita? Eos asperiores illum tempore, repudiandae, maiores molestiae natus aut accusantium voluptate quaerat eaque reiciendis quia?</P>
                <P>2019/03/17 - Null</P>
              </Answer>

            : store.registration.information.symptom_reports.map(({created_at, reported_symptoms}) => (
              
              // Sort by date and link reports
              <Answer>
                <P key={created_at}>{DateTime
                .fromISO(created_at)
                .toLocaleString(DateTime.DATETIME_SHORT)
                 + ": " + reported_symptoms}</P>
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

export default SideEffects;
