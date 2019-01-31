import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Date from "./Date"
import Time from "./Time"

import { mdiClock } from "@mdi/js"
import { darkgrey } from "../colors"
import { Icon } from "@mdi/react"

const DateTime = observer(({ store, date_path, time_path }) => (
  <Layout>
    <Date store={store} path={date_path} />
    <Icon path={mdiClock} size={1} color={darkgrey} />
    <Time store={store} path={time_path} />
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem 1fr;
  text-align: center;
  margin-bottom: 1rem;
  overflow: hidden;
`

export default DateTime
