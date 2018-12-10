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

import Calendar from "./Calendar"
import Button from "../primitives/Button"

const Home = observer(({ store }) => (
  <Layout>
    <TreatmentButton onClick={() => store.reportMedication()} >
      Track Treatment

      <div>
        <Icon size="1rem" color={white} path={mdiPill} />
        <Icon size="1rem" color={white} path={mdiFormatListChecks} />
        <Icon size="1rem" color={white} path={mdiCamera} />
      </div>
    </TreatmentButton>

    <Calendar store={store} />

    <IconKey>
      <Icon size="2rem" color={white} path={mdiPill} />
      <p>Self-reported medicaction</p>

      <Icon size="2rem" color={white} path={mdiFormatListChecks} />
      <p>Self-reported symptoms</p>

      <Icon size="2rem" color={white} path={mdiCamera} />
      <p>Submitted photo of test strip</p>
    </IconKey>
  </Layout>
))

const Layout = styled.div`
`

const IconKey = styled.div`
  color: ${white};
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
`

Home.route = "/"
export default Home;
