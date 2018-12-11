import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Menu from "./Menu"
import { Box } from "reakit";
import { white } from "../colors"

const TopBar = observer(({ store, children, ...props }) => (
  <Layout {...props} >
    <Title>{ store && store.currentPageTitle }</Title>

    { store && store.authorized
      ? <Menu store={store} />
      : null
    }

    <Drawer>
      {children}
    </Drawer>
  </Layout>
))

const Layout = styled(Box)`
  background-color: ${white};
  padding: 1rem;
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: baseline;

  border-radius: 2px;
  border-bottom: 2px solid rgba(100, 100, 100, 0.2);
`

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 0;
`

// A handy space just below the top bar,
// for showing miscellaneous content.
// Disappears when not in use.
const Drawer = styled.div`
  bottom: 0px;
  height: 0px;

  margin-left: auto;
  margin-right: auto;
  position: absolute;
  width: 90%;
`

export default TopBar;
