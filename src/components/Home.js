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
import Survey from "./Survey"
import Button from "../primitives/Button"
import Row from "../primitives/Row"

const Home = observer(({ store }) => (
  <Layout>
    <Row>
      <TreatmentButton onClick={() => store.showPage(Survey)} >
        Track Treatment

        <div>
          <Icon size={1} color={white} path={mdiPill} />
          <Icon size={1} color={white} path={mdiFormatListChecks} />
          <Icon size={1} color={white} path={mdiCamera} />
        </div>
      </TreatmentButton>

      <Help> <IconKey /> </Help>
    </Row>

    <Calendar store={store} />
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const TreatmentButton = styled(Button)`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-grow: 1;
`

Home.route = "/"
export default Home;
