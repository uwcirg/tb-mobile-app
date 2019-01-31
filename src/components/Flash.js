import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { yellow, darkgrey } from "../colors"
import { Icon } from "@mdi/react"
import { mdiClose } from "@mdi/js"

import { Hidden } from "reakit"

// Properties:
//  `mesage`
//  `color` (visual, optional)
const Flash = observer(({ message, color, onDismiss }) => (
  <Hidden.Container zIndex="100" initialState={{ visible: true, unmount: true }}>
    { hidden => (
      <Layout {...hidden} fade color={color}>
        <Message>
          { message }
        </Message>

        <Hidden.Hide {...hidden}>
          <Icon path={mdiClose} size="1rem" color={darkgrey} onClick={onDismiss} />
        </Hidden.Hide>
      </Layout>
    )}
  </Hidden.Container>
))

// `attribute`: Helper function
//
// A first-order helper that navigates one level down a Javascript object tree.
// If the specified attribute is not available,
// the function returns an optional fallback value (default `null`).
const attribute = (query, fallback = null) => (
  object => object[query] || fallback
)

const Layout = styled(Hidden)`
  background-color: ${attribute("color", yellow)};
  padding: 0.5rem;

  border-radius: 2px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.5);
  border-left: 2px solid rgba(100, 100, 100, 0.5);
  border-right: 2px solid rgba(100, 100, 100, 0.5);

  display: flex;
  justify-content: space-between;
`

const Message = styled.p`
  margin: 0.5rem 0;
  color: ${darkgrey};
`

export default Flash
