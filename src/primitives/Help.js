import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Button, Popover } from "reakit"
import { Icon, Stack } from "@mdi/react"
import {
  mdiCircle,
  mdiHelp,
} from "@mdi/js"

import { darkgrey, white } from "../colors"

const Help = observer(({ children }) => (
  <Popover.Container>
    {state => (
      <HelpToggle as={Popover.Toggle} {...state}>
        <Stack size={0.8} >
          <Icon path={mdiCircle} size={0.8} color={darkgrey} />
          <Icon path={mdiHelp} size={0.6} color={white} />
        </Stack>

        <Callout {...state}>
          { children }
        </Callout>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled(Button)`
  width: 2rem;
  flex-basis: 2rem;
`

const Callout = observer(({ children, ...props }) => (
  <CalloutLayout
    fade
    placement="bottom"
    hideOnClickOutside
    {...props}
  >
    { children }
  </CalloutLayout>
))

const CalloutLayout = styled(Popover)`
  background-color: ${white};
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`


export default Help
