import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer, inject } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiMenu, mdiClose, mdiWeb } from "@mdi/js"
import { Box, Block, Backdrop, Portal, Sidebar } from "reakit";
import field from "../util/field"
import { grey, darkgrey, white, red } from "../colors"
import Selection from "../primitives/Selection"

const CoordinatorMenu = inject("coordinatorStore")(observer(({coordinatorStore, assembly }) => (
  <Sidebar.Container>
    {sidebar => (
      <Block>
        <Toggle {...sidebar} >
          <Icon path={mdiMenu} size={1} />
        </Toggle>

        <TransparentBackdrop as={[Portal, Sidebar.Hide]} {...sidebar} />

        <Sidebar align="right" slide as={Portal} {...sidebar}>
          <Observer>
            { () =>
          <Layout>
            <Toggle {...sidebar} >
              <Icon path={mdiClose} size={1} />
            </Toggle>
            <h1>Cuenta de Asistente</h1>
            <p>{coordinatorStore.name}</p>
            <p>{coordinatorStore.email}</p>

            <Question>
              <Icon path={mdiWeb} size={1} />

              <Selection
                update={() => assembly.language}
                options={["Español", "English"]}
                onChange={(selection) => assembly.language = selection}
              />
            </Question>

            <LogoutButton onClick={() => assembly.logout()} >
              Log out
            </LogoutButton>
          </Layout>
            }
          </Observer>
        </Sidebar>
      </Block>
    )}
  </Sidebar.Container>
)))

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

  h1{
    font-size: 1.5em;
  }
`

const Toggle = styled(Sidebar.Toggle)`
  background-color: ${white};
  color: ${darkgrey};
`

const TransparentBackdrop = styled(Backdrop)`
  background-color: ${darkgrey};
  opacity: 0.4;
`

const LogoutButton = styled(Button)`
  background-color: ${red};
  width: 100%;
`

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`

export default CoordinatorMenu
