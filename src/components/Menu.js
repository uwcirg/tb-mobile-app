import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { MenuIcon, CloseIcon } from "mdi-react"
import { Box, Block, Backdrop, Portal, Sidebar, Input } from "reakit";

import { grey, darkgrey, white, red } from "../colors"
import Icon from "../primitives/Icon"
import Selection from "../primitives/Selection"

const Menu = observer(({ store }) => (
  <Sidebar.Container>
    {sidebar => (
      <Block>
        <Toggle {...sidebar} ><MenuIcon /></Toggle>
        <TransparentBackdrop as={[Portal, Sidebar.Hide]} {...sidebar} />

        <Sidebar align="right" slide as={Portal} {...sidebar}>
          <Observer>
            { () =>
          <Layout>
            <Toggle {...sidebar} ><CloseIcon /></Toggle>

            <Question>
              <label htmlFor="name">{store.translate("menu.name")}</label>
              <Field
                name="name"
                value={store.registration.information.name || ""}
                onChange={(e) => { store.registration.information.name = e.target.value; store.registration.update(store.uuid) }}
              />
            </Question>

            <Question>
              <label htmlFor="phone_number">{store.translate("menu.phone_number")}</label>
              <Field
                name="phone_number"
                type="tel"
                value={store.registration.information.phone_number || ""}
                onChange={(e) => { store.registration.information.phone_number = e.target.value; store.registration.update(store.uuid) }}
              />
            </Question>

            <Question>
              <Icon name="Language" mdi="web" />

              <Selection
                update={() => store.language}
                options={["Español", "English"]}
                onChange={(selection) => store.language = selection}
              />
            </Question>

            <Question>
              <label htmlFor="treatment_start">{store.translate("menu.treatment_start")}</label>
              <Field
                type="date"
                value={store.registration.information.treatment_start || ""}
                onChange={(e) => { store.registration.information.treatment_start = e.target.value; store.registration.update(store.uuid) }}
              />
            </Question>

            <LogoutButton onClick={() => store.logout()}>Log out</LogoutButton>
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
export default Menu
