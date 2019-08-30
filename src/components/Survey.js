import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { darkgrey, white, primary, success_green } from "../colors"

import { Tabs } from "reakit";
import "../augments/Tabs"


import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import ReportMedication from "./ReportMedication"
import ReportSymptoms from "./ReportSymptoms"
import PhotoUpload from "./PhotoUpload"

import Help from "../primitives/Help"

import IconKey from "./IconKey"

const Survey = observer(({ assembly }) => (
  <Tabs.Container>
    {state => (
      <Layout className="Survery-Layout">
        <Tabs as={Row} marginBottom="1rem">
          <MultiButton>
            <Tab tab="medication" {...state} >
              <Icon path={mdiPill} size={1} />
            </Tab>

            <Tab tab="symptoms" {...state} >
              <Icon path={mdiFormatListChecks} size={1} />
            </Tab>

            <Tab tab="photo" {...state} >
              <Icon path={mdiCamera} size={1} />
            </Tab>
          </MultiButton>

          <Help> <IconKey assembly={assembly} /> </Help>
        </Tabs>

        {/* Medication 1/1 */}
        <Tabs.Panel tab="medication" {...state} >
          <ReportMedication assembly={assembly} />

          <Tabs.Buttons
            backgroundColor={success_green}
            assembly={assembly}
            text={assembly.translate("survey.continue")}
            onClick={() => assembly.reportMedication()}
            {...state}
          />
        </Tabs.Panel>

        {/* Symptoms 2/3 */}
        <Tabs.Panel tab="symptoms" {...state} >
          <ReportSymptoms assembly={assembly} />

          <Tabs.Buttons
            backgroundColor={success_green}
            assembly={assembly}
            text={assembly.translate("survey.continue")}
            onClick={() => assembly.reportSymptoms()}
            {...state}
          />
        </Tabs.Panel>

        {/* Photo Upload 3/3 */}
        <Tabs.Panel tab="photo" {...state} >
          <PhotoUpload assembly={assembly} />

          <Tabs.Buttons
            backgroundColor={success_green}
            assembly={assembly}
            text={assembly.translate("survey.upload.continue")}
            onClick={() => assembly.photo_uploaded = ""}
            {...state}
          />
        </Tabs.Panel>
      </Layout>
    )}
  </Tabs.Container>
))

const Layout = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;

  border-radius: 0.25em;

  border: 2px solid rgba(100, 100, 100, 50%);
  padding: 0.5rem;
  background-color: ${white};
  margin-top: 0.5rem;
`

const Tab = styled(Tabs.Tab)`
  border: 2px solid rgba(100, 100, 100, 0.5);
  background-color: ${(tabs) => tabs.getCurrentId() === tabs.tab ? primary : white };
  fill: ${(tabs) => tabs.getCurrentId() === tabs.tab ? white : darkgrey };

  margin-top: 0.1rem;
  padding: 0.5rem;

  list-style: none;
  text-align: center;
  width: 33%;
  border-radius: 0.35em;
`

const MultiButton = styled.div`
  display: flex;
  width: 100%;
`

// Took out grid-column-gap: 1rem;
// It was messing with the Info thing on the right of the survey controls
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem;
`

Survey.route = "/survey"
export default Survey
