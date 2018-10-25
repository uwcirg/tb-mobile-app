import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { green } from "./colors"

import TopBar from "./components/TopBar"
import BottomNav from "./components/BottomNav"

const App = observer(({ store }) => (
  <Layout>
    <TopBar store={store} />

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
  background: ${green};
`

Layout.Main = styled.div`
  grid-row: 2;
  margin-left: 2rem;
  margin-right: 2rem;
  overflow-y: auto;
`

export default App;
