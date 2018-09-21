import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer } from "mobx-react"
import { MenuIcon, UserIcon, CloseIcon } from "mdi-react"
import { Box, Block, Backdrop, Portal, Sidebar } from "reakit";
import { grey, darkgrey, white, red } from "../colors"

const Menu = observer(({ store }) => (
  <Sidebar.Container>
    {sidebar => (
      <Block>
        <Toggle {...sidebar} ><MenuIcon /></Toggle>
        <TransparentBackdrop as={[Portal, Sidebar.Hide]} {...sidebar} />

        <Sidebar align="right" slide as={Portal} {...sidebar}>
          <Layout>
            <Toggle {...sidebar} ><CloseIcon /></Toggle>
            <Profile />
            <LogoutButton onClick={() => store.logout()}>Log out</LogoutButton>
          </Layout>
        </Sidebar>
      </Block>
    )}
  </Sidebar.Container>
))

const Layout = styled(Box)`
 bottom: 0;
 top: 0;
 right: 0;
 background-color: ${white}
 height: 100vh;
 width: 20rem;
 border-left: 1px solid ${grey};

 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
`

const Toggle = styled(Sidebar.Toggle)`
  background-color: ${white};
  color: ${darkgrey};
`

const TransparentBackdrop = styled(Backdrop)`
  background-color: ${darkgrey};
  opacity: 0.4;
`

const Profile = styled(UserIcon)`
  height: 10rem;
  width: 10rem;
  border: 1px solid ${darkgrey}
  border-radius: 50%;
`

const LogoutButton = styled(Button)`
 background-color: ${red};
 width: 100%;
`

export default Menu
