import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import Calendar from "react-calendar"
import moment from "moment"
import { Popover, Input } from "reakit"

import Callout from "../primitives/Callout"
import { darkgrey, white } from "../colors"

const Date = observer(({ store, path }) => (
  <Popover.Container>
    { state => (
      <Layout>
        <Popover.Toggle
          as={DateInput}
          {...state}
          value={store[path].format("YYYY-MM-DD")}
        />

        <Callout {...state}>
          <Calendar onClickDay={date => {
            store[path] = moment(date)
            state.hide()
          } } />
        </Callout>
      </Layout>
    ) }
  </Popover.Container>
))

const Layout = styled.div`
  overflow: hidden;
`

const DateInput = styled(Input)`
  background-color: ${white};
  border: 1px solid ${darkgrey};
  color: ${darkgrey};
  padding: 0.5rem;
  width: fill-available;
`

export default Date
