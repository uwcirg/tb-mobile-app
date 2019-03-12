import React from "react"
import { observer } from "mobx-react"

import { Provider, Divider } from "reakit";
import theme from "reakit-theme-default";

import 'react-circular-progressbar/dist/styles.css';
import TreatmentProgress from "../primitives/TreatmentProgress"
import MedicationReports from "./MedicationReports"
import SideEffects from "./SideEffects"
import StripReports from "./StripReports"

import styled from "styled-components"

const total_treatment_days = 25;

const Progress = observer(({store}) => (
    <Provider theme={theme}>
        <div>
          <h2>{store.translate("progress.title")}</h2>
        <ProgressBarContainer>
          <TreatmentProgress>
            {/* TODO: Link the data to this number */}
            <Percentage>{total_treatment_days}</Percentage>

            <TreatmentDays>
              <strong>{store.translate("progress.days")}</strong>
            </TreatmentDays>
          </TreatmentProgress>
        </ProgressBarContainer>

        <Divider />

        <MedicationReports store={store}/>
        <SideEffects store={store}/>
        <StripReports store={store}/>

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

Progress.route = "/progress"
export default Progress;
