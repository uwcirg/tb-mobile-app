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

import IconKey from "./IconKey"
import Survey from "./Survey"

import Help from "../primitives/Help"
import Button from "../primitives/Button"

import AdherenceCalendar from "./AdherenceCalendar"

const Home = observer(({ store }) => (
  <Layout>
    <Row>
      <TreatmentButton onClick={() => store.showPage(Survey)} >
        {store.translate("home.survey")}

        <Icons>
          <Icon size={1} color={white} path={mdiPill} />
          <Icon size={1} color={white} path={mdiFormatListChecks} />
          <Icon size={1} color={white} path={mdiCamera} />
        </Icons>
      </TreatmentButton>

      <Help> <IconKey store={store} /> </Help>
    </Row>

    <AdherenceCalendar store={store} />
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

const Icons = styled.div`
  width: 7rem;
`

const Row = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 2rem;
`

Home.route = "/"
export default Home;
