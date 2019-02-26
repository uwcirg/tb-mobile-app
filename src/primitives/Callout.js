import React from "react"
import styled from "styled-components"

import { observer } from "mobx-react"
import { Popover } from "reakit"
import { white, darkgrey } from "../colors"

const Callout = observer(({ children, ...props }) => (
  <Layout fade placement="bottom" hideOnClickOutside {...props} >
    { children }
  </Layout>
))

const Layout = styled(Popover)`
  background-color: ${white};
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`

export default Callout
