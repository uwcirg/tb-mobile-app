import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import CoordinatorLogin from "./CoordinatorLogin"
import Login from "./Login"

const CoordinatorRegister = observer(({store}) => (
  <Layout>
    <h2>
      {store.translate("coordinator_register.welcome")}
    </h2>

    <p>{store.translate("coordinator_register.context")}</p>

    <Form>
      <label for="name">{store.translate("coordinator_register.name")}</label>
      <Field
        name="name"
        value={store.coordinator_registration.information.name || ""}
        onChange={(e) => store.coordinator_registration.information.name = e.target.value}
      />

      <label for="email">{store.translate("coordinator_register.email")}</label>
      <Field
        name="email"
        type="tel"
        value={store.coordinator_registration.information.email || ""}
        onChange={(e) => store.coordinator_registration.information.email = e.target.value}
      />

      <label for="password">{store.translate("coordinator_register.password")}</label>
      <Field
        type="password"
        value={store.coordinator_registration.information.password || ""}
        onChange={(e) => store.coordinator_registration.information.password = e.target.value}
      />

      <Button onClick={() => store.coordinator_register()}>
        {store.translate("coordinator_register.register")}
      </Button>
    </Form>

    <InternalLink to={CoordinatorLogin} store={store} >
      {store.translate("coordinator_register.link.login")}
    </InternalLink>

    <InternalLink to={Login} store={store} >
      {store.translate("coordinator_register.link.patient_login")}
    </InternalLink>
  </Layout>
))

const Layout = styled(ListOfLinks)`
`

const Field = styled(Input)`
  background-color: ${white}
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`

const Form = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 1rem;
`

CoordinatorRegister.route = "/coordinator_register"
export default CoordinatorRegister;
