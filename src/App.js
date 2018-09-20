import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import TopBar from "./components/TopBar"
import BottomNav from "./components/BottomNav"

const App = observer(({ store }) => (
  <div>
    <Layout>
      <TopBar store={store} />

      <Layout.Main>
        {React.createElement(store.currentPage, { store: store })}
      </Layout.Main>

      <BottomNav store={store} />
    </Layout>
  </div>
))

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-row-gap: 2rem;

  background-size: cover;
  height: 100vh;
  background-image: url(/images/tb-bg.jpg);
`

Layout.Main = styled.div`
  grid-row: 2;
  margin-left: 2rem;
  margin-right: 2rem;
`

export default App;
