import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Tabs } from "reakit";

import { darkgrey, lightgrey } from "../colors"
import Button from "../primitives/Button"
import Home from "../components/Home"

// TODO this is too complex; it is marked as deprecated.
// Use of this component will not be supported
// in future versions of the Assemble framework.
Tabs.Buttons = observer(({ primary, secondary, onPrimary, onSecondary, store, ...state }) => (
  <ButtonLayout>
    
    {/* No need to have the skip button */}
    {/* <Button
      as={Tabs.Next}
      color={darkgrey}
      backgroundColor={lightgrey}
      {...state}
      onClick={() => {
        onSecondary && onSecondary()

        if(state.current === state.ids.length - 1)
          store.showPage(Home);
      } }
    >
      {secondary}
    </Button> */}

    <Button
      as={Tabs.Next}
      {...state}
      onClick={() => {
        onPrimary && onPrimary()

        if(state.current === state.ids.length - 1)
          store.showPage(Home);
      } }
    >
      {primary}
    </Button>
  </ButtonLayout>
))

const ButtonLayout = styled.div`
  display: grid;
  margin: auto;
  margin-top: 1rem;
  width: 100%;
`

