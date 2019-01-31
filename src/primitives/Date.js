import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import Calendar from "react-calendar"
import moment from "moment"
import { Popover, Button } from "reakit"

import Callout from "../primitives/Callout"
import { darkgrey, white } from "../colors"

const Date = observer(({ store, path }) => (
  <Popover.Container>
    { state => (
      <Layout>
        <Button as={Popover.Toggle} {...state} >
          <DateInput value={store[path].format("YYYY-MM-DD")} />
        </Button>

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

const DateInput = styled.input`
  background-color: ${white};
  color: ${darkgrey};
  padding: 0.5rem;
  border: 1px solid ${darkgrey};
`

export default Date
