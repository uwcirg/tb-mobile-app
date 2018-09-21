import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import Menu from "./Menu"
import { Box } from "reakit";
import { white } from "../colors"

const TopBar = observer(({ store }) => (
  <Layout>
    <Title>{ store.currentPageTitle }</Title>

    { store.isLoggedIn
      ? <Menu store={store} />
      : null
    }
  </Layout>
))

const Layout = styled(Box)`
  background-color: ${white};
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

export default TopBar;
