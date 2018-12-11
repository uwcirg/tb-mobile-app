import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Popover } from "reakit"
import { Button } from "reakit"

import { darkgrey, white } from "../colors"

import { Icon, Stack } from "@mdi/react"
import {
  mdiCircle,
  mdiHelp,
} from "@mdi/js"

const Help = observer(({ children }) => (
  <Popover.Container>
    {state => (
      <HelpToggle as={Popover.Toggle} {...state}>
        <Stack>
          <Icon size="2rem" path={mdiCircle} size={1} color={darkgrey} />
          <Icon size="1.2rem" path={mdiHelp} size={0.8} color={white} />
        </Stack>

        <Rectangle fade slide expand hideOnClickOutside {...state}>
          <Popover.Arrow fillColor="white" strokeColor="rgba(50, 50, 50, 0.5)" />
          { children }
        </Rectangle>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled(Button)`
  flex-basis: 2rem;
  margin-left: 1rem;
`

const Rectangle = styled(Popover)`
  background-color: white;
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`

export default Help
