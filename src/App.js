import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { beige, darkgrey } from "./colors"

import BottomNav from "./components/BottomNav"
import TopBar from "./components/TopBar"

const App = observer(({ store }) => (
  <Layout>
    <TopBar store={store} />

    <Layout.Main>
      {React.createElement(store.currentPage, { store: store })}
    </Layout.Main>

    { store.authorized
      ? <BottomNav store={store} />
      : null
    }
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 1rem;
  height: 100vh;
  background-size: cover;
  background: ${beige};
  color: ${darkgrey};
`

Layout.Main = styled.div`
  overflow-y: auto;
  margin-left: 1rem;
  margin-right: 1rem;
  width: auto;
`

export default App
