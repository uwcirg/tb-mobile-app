import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Row from "./Row"
import Date from "./Date"
import Time from "./Time"

import { mdiClock } from "@mdi/js"
import { darkgrey } from "../colors"
import { Icon } from "@mdi/react"

const DateTime = observer(({ store, date_path, time_path }) => (
  <Row>
    <FortyPercent>
      <Date store={store} path={date_path} />
    </FortyPercent>

    <TwentyPercent>
      <Icon path={mdiClock} size={1} color={darkgrey} />
    </TwentyPercent>

    <FortyPercent>
      <Time store={store} path={time_path} />
    </FortyPercent>
  </Row>
))

const Layout = styled(Row)`
  display: grid;
  grid-template-columns: 40% 20% 40%;
  text-align: center;
  width: auto;

  margin-bottom: 1rem;
`

const FortyPercent = styled.div`
  overflow: hidden;
`

const TwentyPercent = styled.div`
  text-align: center;
`

export default DateTime
