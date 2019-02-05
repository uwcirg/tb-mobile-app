import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { darkgrey, blue, white } from "../colors"

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

const Survey = observer(({ store }) => (
  <Tabs.Container>
    {state => (
      <Layout>
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

          <Help> <IconKey store={store} /> </Help>
        </Tabs>

        <Tabs.Panel tab="medication" {...state} >
          <ReportMedication store={store} />

          <Tabs.Buttons
            store={store}
            primary={store.translate("survey.continue")}
            secondary={store.translate("survey.skip")}
            onPrimary={() => store.reportMedication()}
            {...state}
          />
        </Tabs.Panel>

        <Tabs.Panel tab="symptoms" {...state} >
          <ReportSymptoms store={store} />

          <Tabs.Buttons
            store={store}
            primary={store.translate("survey.continue")}
            secondary={store.translate("survey.skip")}
            onPrimary={() => store.reportSymptoms()}
            {...state}
          />
        </Tabs.Panel>

        <Tabs.Panel tab="photo" {...state} >
          <PhotoUpload store={store} />

          <Tabs.Buttons
            store={store}
            primary={store.translate("survey.upload.continue")}
            secondary={store.translate("survey.upload.skip")}
            onPrimary={() => store.reportStrip()}
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

  border-radius: 2px
  border: 2px solid rgba(100, 100, 100, 50%);
  padding: 0.5rem;
  background-color: ${white};
`

const Tab = styled(Tabs.Tab)`
  border: 2px solid rgba(100, 100, 100, 0.5);
  background-color: ${(tabs) => tabs.getCurrentId() === tabs.tab ? blue : white };
  fill: ${(tabs) => tabs.getCurrentId() === tabs.tab ? white : darkgrey };

  margin-top: 0.1rem;
  padding: 0.5rem;

  list-style: none;
  text-align: center;
  width: 33%;
`

const MultiButton = styled.div`
  display: flex;
  width: 100%;
`

const Row = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 2rem;
`

Survey.route = "/survey"
export default Survey
