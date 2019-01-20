import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Button, Popover } from "reakit"
import "../augments/Popover"

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

        <Popover.Rectangle fade slide hideOnClickOutside {...state}>
          <Popover.Arrow fillColor={white} strokeColor="rgba(50, 50, 50, 0.5)" />
          { children }
        </Popover.Rectangle>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled(Button)`
  flex-basis: 2rem;
  margin-left: 1rem;
`

export default Help
