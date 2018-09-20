import React from "react"
import styled from "styled-components"
import { Box } from "reakit"
import { observer } from "mobx-react"
import { red, white } from "../colors"
import Button from "../primitives/Button"

const TopBar = observer(({ store }) => (
  <Layout>
    <Title>{ store.currentPageTitle }</Title>

    { store.isLoggedIn
      ? <Button backgroundColor={red} onClick={() => store.logout()}>
          Log out
        </Button>
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
