import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { darkgrey, green, white } from "../colors"

import { Tabs } from "reakit";
import "../augments/Tabs"

import Row from "../primitives/Row"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
  mdiClock,
} from "@mdi/js"

import Date from "../primitives/Date"
import Time from "../primitives/Time"

import ReportMedication from "./ReportMedication"
import ReportSymptoms from "./ReportSymptoms"
import PhotoUpload from "./PhotoUpload"

import Help from "./Help"
import IconKey from "./IconKey"

const Survey = observer(({ store }) => (
  <Layout>
    <Row>
      <FortyPercent>
        <Date store={store} path="survey_date" />
      </FortyPercent>

      <TwentyPercent>
        <Icon flexBasis="20%" path={mdiClock} size={1} color={darkgrey} />
      </TwentyPercent>

      <FortyPercent>
        <Time store={store} path="survey_medication_time" />
      </FortyPercent>
    </Row>

    <Tabs.Container>
      {state => (
        <Card>
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

            <Tabs.Buttons
              store={store}
              primary="Tomo la medicación."
              secondary="No tomo."
              {...state}
            />
          </Tabs.Panel>

          <Tabs.Panel tab="symptoms" {...state} >
            <ReportSymptoms store={store} />

            <Tabs.Buttons
              store={store}
              primary="Continuar"
              secondary="Omitir"
              {...state}
            />
          </Tabs.Panel>

          <Tabs.Panel tab="photo" {...state} >
            <PhotoUpload store={store} />

            <Tabs.Buttons
              store={store}
              primary="Continuar"
              secondary="Omitir"
              {...state}
            />
          </Tabs.Panel>
        </Card>
      )}
    </Tabs.Container>
  </Layout>
))

const Layout = styled.div`
`

const Card = styled.div`
  border-radius: 2px
  border: 2px solid rgba(100, 100, 100, 50%);
  padding: 0.5rem;
  background-color: ${white};
`

const FortyPercent = styled.div`
  overflow: hidden;
  width: 40%;
`

const TwentyPercent = styled.div`
  text-align: center;
  width: 20%;
`

const Tab = styled(Tabs.Tab)`
  border: 2px solid rgba(100, 100, 100, 0.5);
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
