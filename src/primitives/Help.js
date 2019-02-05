import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Button, Popover } from "reakit"
import { Icon, Stack } from "@mdi/react"
import {
  mdiCircle,
  mdiHelp,
} from "@mdi/js"

import Callout from "./Callout"
import { darkgrey, white } from "../colors"

const Help = observer(({ children }) => (
  <Popover.Container>
    {state => (
      <HelpToggle as={Popover.Toggle} {...state}>
        <Stack>
          <Icon path={mdiCircle} size={1} color={darkgrey} />
          <Icon path={mdiHelp} size={0.8} color={white} />
        </Stack>

        <Callout {...state}>{ children }</Callout>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled(Button)`
  width: 2rem;
  flex-basis: 2rem;
  margin-left: 1rem;
`

export default Help
