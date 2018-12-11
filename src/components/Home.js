import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"

import { darkgrey, white } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import Help from "./Help"
import Calendar from "./Calendar"
import Button from "../primitives/Button"

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

      <Help>
        <IconKey>
          <Icon size="2rem" color={darkgrey} path={mdiPill} />
          <p>Self-reported medication</p>

          <Icon size="2rem" color={darkgrey} path={mdiFormatListChecks} />
          <p>Self-reported symptoms</p>

          <Icon size="2rem" color={darkgrey} path={mdiCamera} />
          <p>Submitted photo of test strip</p>
        </IconKey>
      </Help>
    </Row>

    <Calendar store={store} />
  </Layout>
))

const Layout = styled.div`
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const IconKey = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 2rem auto;
  margin-top: 1rem;
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
