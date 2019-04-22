import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiMenu, mdiClose, mdiWeb } from "@mdi/js"
import { Box, Block, Backdrop, Portal, Sidebar } from "reakit";
import field from "../util/field"
import { grey, darkgrey, white, red } from "../colors"
import Selection from "../primitives/Selection"

const CoordinatorMenu = observer(({ assembly }) => (
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

            <Question>
              {field(assembly, "coordinator_menu.name").label}
              {field(assembly, "coordinator_menu.name").field}
            </Question>

            <Question>
              {field(assembly, "coordinator_menu.email", "email").label}
              {field(assembly, "coordinator_menu.email", "email").field}
            </Question>

            <Question>
              <Icon path={mdiWeb} size={1} />

              <Selection
                update={() => assembly.language}
                options={["Español", "English"]}
                onChange={(selection) => assembly.language = selection}
              />
            </Question>

            <Button onClick={() =>
              assembly.coordinator_account.update(assembly.coordinator_menu)
            } >
              Save
            </Button>

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
