import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiMenu, mdiClose, mdiWeb } from "@mdi/js"
import { Box, Block, Backdrop, Portal, Sidebar, Input } from "reakit";

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
              <label htmlFor="name">
                {assembly.translate("menu.name")}
              </label>

              <Field
                name="name"
                value={assembly.coordinator_account.information.name || ""}
                onChange={(e) => {
                  assembly.coordinator_account.information.name = e.target.value
                  assembly.coordinator_account.update(assembly.uuid)
                }}
              />
            </Question>

            <Question>
              <label htmlFor="email">
                {assembly.translate("menu.email")}
              </label>

              <Field
                name="email"
                type="email"
                value={assembly.coordinator_account.information.email || ""}
                onChange={(e) => {
                  // TODO possible race condition.
                  // Fold all logic into the `update` function,
                  // with a semaphore to prevent losing data.
                  assembly.coordinator_account.information.email = e.target.value
                  assembly.coordinator_account.update(assembly.uuid)
                }}
              />
            </Question>

            <Question>
              <Icon path={mdiWeb} size={1} />

              <Selection
                update={() => assembly.language}
                options={["Español", "English"]}
                onChange={(selection) => assembly.language = selection}
              />
            </Question>

            <LogoutButton onClick={() => assembly.logout()}>Log out</LogoutButton>
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

const Field = styled(Input)`
  background-color: ${white}
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`
export default CoordinatorMenu
