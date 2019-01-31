import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { beige, darkgrey } from "./colors"

import Navigation from "./components/Navigation"
import AuthBar from "./components/AuthBar"

import Space from "./primitives/Space"

const App = observer(({ store }) => (
  <Layout>
    <AuthBar store={store} alerts={store.alerts} />

    {React.createElement(store.currentPage, { store: store })}

    <Space/>

    { store.authorized
      ? <Navigation store={store} />
      : null
    }
  </Layout>
))

const Layout = styled.div`
  height: 100vh;
  background-size: cover;

  background: ${beige};
  color: ${darkgrey};

  display: grid;
  grid-template-rows: 4rem auto 1fr 4rem;
  grid-row-gap: 1rem;
`

export default App
