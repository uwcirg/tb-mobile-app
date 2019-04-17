import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiMenu, mdiClose, mdiWeb } from "@mdi/js"
import { Box, Block, Backdrop, Popover, Portal, Input } from "reakit";
import { grey, darkgrey, white, red } from "../colors"
import Selection from "../primitives/Selection"

const Menu = observer(({ assembly }) => (
  <Popover.Container>
    {sidebar => (
      <Block>
        <Toggle {...sidebar} >
          <Icon path={mdiMenu} size={1} />
        </Toggle>

        <TransparentBackdrop as={[Portal, Pop.Hide]} {...sidebar} />

        <Pop align="right" slide as={Portal} {...sidebar}>
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
                value={assembly.participant_account.information.name || ""}
                onChange={(e) => {
                  assembly.participant_account.information.name = e.target.value
                  assembly.participant_account.update(assembly.uuid)
                }}
              />
            </Question>

            <Question>
              <label htmlFor="phone_number">
                {assembly.translate("menu.phone_number")}
              </label>

              <Field
                name="phone_number"
                type="tel"
                value={assembly.participant_account.information.phone_number || ""}
                onChange={(e) => {
                  assembly.participant_account.information.phone_number = e.target.value
                  assembly.participant_account.update(assembly.uuid)
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

            <Question>
              <label htmlFor="treatment_start">
                {assembly.translate("menu.treatment_start")}
              </label>

              <Field
                type="date"
                value={assembly.participant_account.information.treatment_start || ""}
                onChange={(e) => {
                  // TODO possible race condition.
                  // Fold all logic into the `update` function,
                  // with a semaphore to prevent losing data.
                  assembly.participant_account.information.treatment_start = e.target.value
                  assembly.participant_account.update(assembly.uuid)
                }}
              />
            </Question>

            <LogoutButton onClick={() => assembly.logout()}>Log out</LogoutButton>
          </Layout>
        </Pop>
      </Block>
    )}
  </Popover.Container>
))

const Layout = styled(Box)`
  bottom: 0;
  top: 0;
  right: 0;
  background-color: ${white}
  width: 20rem;
  border: 1px solid ${grey};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Pop = styled(Popover)`
  border: 1px solid ${darkgrey};
  padding: 1rem;
  background-color: ${white};
`

const Toggle = styled(Pop.Toggle)`
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

export default Menu
