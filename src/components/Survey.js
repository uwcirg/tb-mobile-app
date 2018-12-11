import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import Button from "../primitives/Button"
import { darkgrey, lightgrey, green, beige, white } from "../colors"
import { Block, Tabs } from "reakit";

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import ReportMedication from "./ReportMedication"
import ReportSymptoms from "./ReportSymptoms"
import PhotoUpload from "./PhotoUpload"

const Survey = observer(({ store }) => (
  <div>
    <Tabs.Container>
      {state => (
        <Block>
          <Tabs>
            <MultiButton>
              <Tab active={0 === state.current} tab="Report Medication"  {...state} >
                <Icon path={mdiPill} size="1rem" />
              </Tab>

              <Tab active={1 === state.current} tab="Report Symptoms" {...state} >
                <Icon path={mdiFormatListChecks} size="1rem" />
              </Tab>

              <Tab active={2 === state.current} tab="Upload Photo" {...state} >
                <Icon path={mdiCamera} size="1rem" />
              </Tab>
            </MultiButton>
          </Tabs>

          <Tabs.Panel tab="Report Medication" {...state} >
            <ReportMedication store={store} />
          </Tabs.Panel>

          <Tabs.Panel tab="Report Symptoms" {...state} >
            <ReportSymptoms store={store} />
          </Tabs.Panel>

          <Tabs.Panel tab="Upload Photo" {...state} >
            <PhotoUpload store={store} />
          </Tabs.Panel>

          <Buttons>
            <Button
              as={Tabs.Next}
              color={darkgrey}
              backgroundColor={lightgrey}
              {...state}
              onClick={() => {
                if(state.current === state.ids.length - 1)
                  store.showHome();
              } }
            >
              Omitir
            </Button>

            <Button
              as={Tabs.Next}
              {...state}
              onClick={() => {
                if(state.current === state.ids.length - 1)
                  store.showHome();
              } }
            >
              Continuar
            </Button>
          </Buttons>
        </Block>
      )}
    </Tabs.Container>
  </div>
))

const Buttons = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  width: 100%;
`

const Tab = styled(Tabs.Tab)`
  border: 1px solid white;
  background-color: ${(tabs) => tabs.active ? green : white };
  color: ${(tabs) => tabs.active ? white : green };

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

Survey.route = "/survey"
export default Survey
