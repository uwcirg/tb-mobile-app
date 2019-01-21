import React from "react"
import styled from "styled-components"

import { observer } from "mobx-react"
import { Popover } from "reakit"
import { white, darkgrey } from "../colors"

export default observer(({ children, ...props }) => (
  <Layout fade slide hideOnClickOutside {...props} >
    <Popover.Arrow fillColor={white} strokeColor={darkgrey} />
    { children }
  </Layout>
))

const Layout = styled(Popover)`
  width: 80%;
  background-color: white;
  border: 2px solid rgba(100, 100, 100, 0.5);
  padding: 1rem;
  color: ${darkgrey};
`

