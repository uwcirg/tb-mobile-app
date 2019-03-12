import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Tabs } from "reakit";

import Button from "../primitives/Button"
import Home from "../components/Home"

// TODO this is too complex; it is marked as deprecated.
// Use of this component will not be supported
// in future versions of the Assemble framework.
Tabs.Buttons = observer(({ text, onClick, assembly, ...state }) => (
  <ButtonLayout>
    <Button
      as={Tabs.Next}
      {...state}
      onClick={() => {
        onClick && onClick()

        if(state.current === state.ids.length - 1)
          assembly.currentPage = Home
      } }
    >
      {text}
    </Button>
  </ButtonLayout>
))

const ButtonLayout = styled.div`
  display: grid;
  margin: auto;
  margin-top: 1rem;
  width: 100%;
`

