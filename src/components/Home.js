import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import moment from "moment"

import { lightgrey, darkgrey, grey, white } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

import Calendar from "./Calendar"

const Home = observer(({ store }) => (
  <Layout>
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

Home.route = "/"
export default Home;
