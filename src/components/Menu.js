import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiMenu, mdiClose, mdiWeb } from "@mdi/js"
import { Box, Block, Backdrop, Sidebar, Portal } from "reakit";
import { grey, darkgrey, white, red } from "../colors"
import Selection from "../primitives/Selection"
import field from "../util/field"

const Menu = observer(({ assembly }) => (
  <Sidebar.Container>
    {sidebar => (
      <Block>
        <Toggle {...sidebar} >
          <Icon path={mdiMenu} size={1} />
        </Toggle>

        <TransparentBackdrop as={[Portal, Sidebar.Hide]} {...sidebar} />

        <Side align="right" slide as={Portal} {...sidebar}>
          <Observer>{() =>
          <Layout>
            <Toggle {...sidebar} >
              <Icon path={mdiClose} size={1} />
            </Toggle>

            <Question>
              {field(assembly, "menu.name").label}
              {field(assembly, "menu.name").field}
            </Question>

            <Question>
              {field(assembly, "menu.phone_number", "tel").label}
              {field(assembly, "menu.phone_number", "tel").field}
            </Question>

            <Question>
              <Icon path={mdiWeb} size={1} />

              <Selection
                update={() => assembly.language}
                options={["Español", "English"]}
                onChange={(selection) => assembly.language = selection}
              />
            </Question>

            <Question>
              {field(assembly, "menu.treatment_start", "date").label}
              {field(assembly, "menu.treatment_start", "date").field}
            </Question>

            <Button
              onClick={() => assembly.participant_account.update(assembly.menu)}
            >
              Save
            </Button>

            <LogoutButton onClick={() => assembly.logout()}>
              Log out
            </LogoutButton>
          </Layout>
          }</Observer>
        </Side>
      </Block>
    )}
  </Sidebar.Container>
))

const Layout = styled(Box)`
  bottom: 0;
  top: 0;
  right: 0;
  background-color: ${white}
  width: 20rem;
  border: 1px solid ${grey};
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Side = styled(Sidebar)`
  border: 1px solid ${darkgrey};
  padding: 1rem;
  background-color: ${white};
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

export default Menu
