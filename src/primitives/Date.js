import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import Calendar from "react-calendar"
import moment from "moment"
import { Popover, Button } from "reakit"

import { darkgrey, white } from "../colors"
import "../augments/Popover"

const Date = observer(({ store, path }) => (
  <Popover.Container>
    { state => (
      <div>
        <Button width="100%" as={Popover.Toggle} {...state} >
          <DateBox>
            {store[path].format("YYYY-MM-DD")}
          </DateBox>
        </Button>

        <Popover.Rectangle fade slide hideOnClickOutside {...state}>
          <Popover.Arrow fillColor="white" strokeColor="rgba(50, 50, 50, 0.5)" />

          <Calendar onClickDay={date => {
            store[path] = moment(date)
            state.hide()
          } } />
        </Popover.Rectangle>
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
