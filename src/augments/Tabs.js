import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Tabs } from "reakit";

import { darkgrey, lightgrey } from "../colors"
import Button from "../primitives/Button"

Tabs.Buttons = observer(({ primary, secondary, onPrimary, onSecondary, store, ...state }) => (
  <ButtonLayout>
    <Button
      as={Tabs.Next}
      color={darkgrey}
      backgroundColor={lightgrey}
      {...state}
      onClick={() => {
        onSecondary && onSecondary()

        if(state.current === state.ids.length - 1)
          store.showHome();
      } }
    >
      {secondary}
    </Button>

    <Button
      as={Tabs.Next}
      {...state}
      onClick={() => {
        onPrimary && onPrimary()

        if(state.current === state.ids.length - 1)
          store.showHome();
      } }
    >
      {primary}
    </Button>
  </ButtonLayout>
))

const ButtonLayout = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin-top: 1rem;
  width: 100%;
`

