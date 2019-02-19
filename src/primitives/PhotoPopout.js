import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Button, Popover } from "reakit";
import Callout from "./Callout"

const PhotoPopout = observer(({ children }) => (
  <Popover.Container>
    {state => (
      <HelpToggle as={Popover.Toggle} {...state}>
        View
        <Callout {...state}>{ children }</Callout>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled(Button)`
  width: 2rem;
  flex-basis: 2rem;
  color:blue;
  text-decoration:underline;
`

export default PhotoPopout