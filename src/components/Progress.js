import React from "react"
import { observer,inject } from "mobx-react"

import { Provider, Divider } from "reakit";
import theme from "reakit-theme-default";

import 'react-circular-progressbar/dist/styles.css';
import TreatmentProgress from "../primitives/TreatmentProgress"
import MedicationReports from "./MedicationReports"
import SideEffects from "./SideEffects"
import StripReports from "./StripReports"
import days_of_treatment from "../util/days_of_treatment"

import styled from "styled-components"

const Progress = inject("participantStore")(observer(({participantStore, assembly }) => (
    <Provider theme={theme}>
      <div>
        <h2>{assembly.translate("progress.title")}</h2>

        <ProgressBarContainer>
        {console.log("here "+ participantStore.uuid)}
          <TreatmentProgress assembly={assembly}>
            <Percentage>
              {days_of_treatment(participantStore.information)}
            </Percentage>

            <TreatmentDays>
              {assembly.translate("progress.days")}
            </TreatmentDays>
          </TreatmentProgress>
        </ProgressBarContainer>

        <Divider />

        <MedicationReports assembly={assembly}/>
        <SideEffects assembly={assembly}/>
        <StripReports assembly={assembly}/>

      </div>
    </Provider>
)));

const TreatmentDays = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
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

Progress.route = "/progress"
export default Progress;
