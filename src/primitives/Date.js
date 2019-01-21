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
      <div>
        <Button width="100%" as={Popover.Toggle} {...state} >
          <DateBox>
            {store[path].format("YYYY-MM-DD")}
          </DateBox>
        </Button>

        <Callout {...state}>
          <Calendar onClickDay={date => {
            store[path] = moment(date)
            state.hide()
          } } />
        </Callout>
      </div>
    ) }
  </Popover.Container>
))

const DateBox = styled.div`
  background-color: ${white};
  color: ${darkgrey};
  padding: 0.5rem;
  border: 1px solid ${darkgrey};
`

export default Date
