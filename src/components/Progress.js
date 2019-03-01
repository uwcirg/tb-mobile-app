import React from "react"
import { observer } from "mobx-react"
import { darkgrey } from "../colors"

import { Provider, Divider, Paragraph } from "reakit";
import theme from "reakit-theme-default";

import 'react-circular-progressbar/dist/styles.css';
import Fold from "../primitives/Fold"
import CustomContentProgressBar from "../primitives/CustomContentProgressBar"

import styled from "styled-components"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

const total_treatment_days = 112;

const Progress = observer(({store}) => (
    <Provider theme={theme}>
      <div>
        {/* TODO: Translations for this whole page */}
        <Heading>Mi Progreso</Heading>

        <ProgressBarContainer>
          <CustomContentProgressBar>
            {/* TODO: Link the data to this number */}
            <Percentage>{total_treatment_days}</Percentage>
            {/* TODO translation */}
            <TreatmentDays>
              <strong>Days of Treatment</strong>
            </TreatmentDays>
          </CustomContentProgressBar>
        </ProgressBarContainer>

      <Divider />
        <Fold>
          <Question>
            {/* TODO: Figure out how to add vertical alignment for these icons */}
          <Icon size="1.5rem" color={darkgrey} path={mdiPill} /> Medication History
          </Question>

          <Answer>
            {/* TODO: data */}
            <P>2019/02/20 - Yes</P>
            <P>2019/02/19 - Yes</P>
            <P>2019/02/18 - Yes</P>
            <P>2019/02/17 - No</P>
          </Answer>
        </Fold>

        <Fold>
          <Question>
          <Icon size="1.5rem" color={darkgrey} path={mdiFormatListChecks} /> Side Effect History
          </Question>

          <Answer>
            {/* TODO: data */}
            <P>2019/02/20 - Nausea</P>
            <P>2019/02/19 - Redness, Nausea, Appetite loss</P>
            <P>2019/02/18 - Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim et alias nam obcaecati molestias expedita? Eos asperiores illum tempore, repudiandae, maiores molestiae natus aut accusantium voluptate quaerat eaque reiciendis quia?</P>
            <P>2019/02/17 - Null</P>
          </Answer>
        </Fold>

        <Fold>
          <Question>
          <Icon size="1.5rem" color={darkgrey} path={mdiCamera} /> Test Result History 
          </Question>

          <Answer>
            {/* TODO: data */}
            <P>2019/02/20 - Unclear / Not Yet Confirmed</P>
            <P>2019/02/19 - Confirmed</P>
            <P>2019/02/18 - Confirmed</P>
            <P>2019/02/17 - No Photo Submitted</P>
          </Answer>
        </Fold>
      </div>
    </Provider>
))

const TreatmentDays = styled.div`
  font-size: 0.85rem;
  font-weight: 400;
`
const ProgressBarContainer = styled.div`
  width: 10rem;
  height: 10rem;
  margin: auto;
`

const Percentage = styled.div`
  font-size: 2rem;
  font-weight: 400;
`

const Question = styled(Heading)`
  font-weight: 100;
  margin: 0;
  display: flexbox;
  align-items: center;
`

const Answer = styled.div`
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

Progress.route = "/progress"
export default Progress;
