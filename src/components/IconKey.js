import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { darkgrey } from "../colors"

import { Icon } from "@mdi/react"
import {
  mdiCamera,
  mdiFormatListChecks,
  mdiPill,
} from "@mdi/js"

const IconKey = observer(() => (
  <Layout>
    <Icon size="2rem" color={darkgrey} path={mdiPill} />
    <p>Self-reported medication</p>

    <Icon size="2rem" color={darkgrey} path={mdiFormatListChecks} />
    <p>Self-reported symptoms</p>

    <Icon size="2rem" color={darkgrey} path={mdiCamera} />
    <p>Submitted photo of test strip</p>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 2rem auto;
  margin-top: 1rem;
`

export default IconKey
