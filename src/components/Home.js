import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"

import { white } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import Help from "./Help"
import IconKey from "./IconKey"
import Calendar from "./Calendar"
import Button from "../primitives/Button"
import Row from "../primitives/Row"

const Home = observer(({ store }) => (
  <Layout>
    <Row>
      <TreatmentButton onClick={() => store.reportMedication()} >
        Track Treatment

        <div>
          <Icon size="1rem" color={white} path={mdiPill} />
          <Icon size="1rem" color={white} path={mdiFormatListChecks} />
          <Icon size="1rem" color={white} path={mdiCamera} />
        </div>
      </TreatmentButton>

      <Help> <IconKey /> </Help>
    </Row>

    <Calendar store={store} />
  </Layout>
))

const Layout = styled.div`
`

const TreatmentButton = styled(Button)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  width: 100%;
  flex-grow: 1;
`

Home.route = "/"
export default Home;
