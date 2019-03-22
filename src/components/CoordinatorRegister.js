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

const CoordinatorRegister = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("coordinator_register.welcome")}
    </h2>

    <p>{assembly.translate("coordinator_register.context")}</p>

    <Form>
      <label htmlFor="name">
        {assembly.translate("coordinator_register.name")}
      </label>

      <Field
        name="name"
        value={assembly.coordinator_account.information.name || ""}
        onChange={(e) => assembly.coordinator_account.information.name = e.target.value}
      />

      <label htmlFor="email">
        {assembly.translate("coordinator_register.email")}
      </label>

      <Field
        name="email"
        // TODO: type can be email here?
        type="tel"
        value={assembly.coordinator_account.information.email || ""}
        onChange={(e) => assembly.coordinator_account.information.email = e.target.value}
      />

      <label htmlFor="password">
        {assembly.translate("coordinator_register.password")}
      </label>

      <Field
        type="password"
        value={assembly.coordinator_account.information.password || ""}
        onChange={(e) => assembly.coordinator_account.information.password = e.target.value}
      />

      <Button onClick={() => assembly.coordinator_register()}>
        {assembly.translate("coordinator_register.register")}
      </Button>
    </Form>

    <InternalLink to={CoordinatorLogin} assembly={assembly} >
      {assembly.translate("coordinator_register.link.login")}
    </InternalLink>

    <InternalLink to={Login} assembly={assembly} >
      {assembly.translate("coordinator_register.link.patient_login")}
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
