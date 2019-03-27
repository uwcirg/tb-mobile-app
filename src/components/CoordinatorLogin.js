
import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Login from "./Login"

const CoordinatorLogin = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("coordinator_login.welcome")}
    </h2>

    <p>{assembly.translate("coordinator_login.context")}</p>

    <Form>
      <Field
        type="tel"
        placeholder={assembly.translate("coordinator_login.email")}
        value={assembly.coordinator_login_credentials.email}
        onChange={(e) => assembly.coordinator_login_credentials.email = e.target.value}
      />

      <Field
        type="password"
        placeholder={assembly.translate("coordinator_login.password")}
        value={assembly.coordinator_login_credentials.password}
        onChange={(e) => assembly.coordinator_login_credentials.password = e.target.value}
      />

      <Button onClick={() => assembly.coordinator_login()}>
        {assembly.translate("coordinator_login.go")}
      </Button>
    </Form>

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

CoordinatorLogin.route = "/coordinator_login"
export default CoordinatorLogin;
