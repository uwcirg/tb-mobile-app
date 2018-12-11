import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { beige } from "./colors"

import BottomNav from "./components/BottomNav"
import Flash from "./components/Flash"
import TopBar from "./components/TopBar"

const App = observer(({ store }) => (
  <Layout>
    <TopBar store={store} >
    </TopBar>

    <Layout.Main>
      {React.createElement(store.currentPage, { store: store })}
    </Layout.Main>

    { store.isLoggedIn
      ? <BottomNav store={store} />
      : null
    }
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 2rem;
  height: 100vh;
  background-size: cover;
  background: ${beige};
`

Layout.Main = styled.div`
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
  width: 20rem;
`

export default App
