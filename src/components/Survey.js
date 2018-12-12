import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { darkgrey, lightgrey, green, white } from "../colors"
import { Block, Tabs } from "reakit";

import Button from "../primitives/Button"
import Row from "../primitives/Row"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import ReportMedication from "./ReportMedication"
import ReportSymptoms from "./ReportSymptoms"
import PhotoUpload from "./PhotoUpload"

import Help from "./Help"
import IconKey from "./IconKey"

const Survey = observer(({ store }) => (
  <div>
    <Tabs.Container>
      {state => (
        <Block>
          <Row as={Tabs}>
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

            <Help> <IconKey /> </Help>
          </Row>

          <Tabs.Panel tab="medication" {...state} >
            <ReportMedication store={store} />
          </Tabs.Panel>

          <Tabs.Panel tab="symptoms" {...state} >
            <ReportSymptoms store={store} />
          </Tabs.Panel>

          <Tabs.Panel tab="photo" {...state} >
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
  background-color: ${(tabs) => tabs.getCurrentId() === tabs.tab ? green : white };
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

Survey.route = "/survey"
export default Survey
