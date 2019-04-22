import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import InternalLink from "../primitives/InternalLink"
import Login from "./Login"
import field from "../util/field"

const CoordinatorLogin = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("coordinator_login.welcome")}
    </h2>

    <p>{assembly.translate("coordinator_login.context")}</p>

    <Form>
      {field(assembly, "coordinator_login.email", "email").label}
      {field(assembly, "coordinator_login.email", "email").field}

      {field(assembly, "coordinator_login.password", "password").label}
      {field(assembly, "coordinator_login.password", "password").field}

      <Button onClick={() => assembly.login_coordinator()}>
        {assembly.translate("coordinator_login.go")}
      </Button>
    </Form>

    <InternalLink to={Login} assembly={assembly} >
      {assembly.translate("coordinator_login.link.patient_login")}
    </InternalLink>
  </Layout>
))

const Layout = styled(ListOfLinks)`
`

const Form = styled.div`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-column-gap: 1rem;
`

CoordinatorLogin.route = "/coordinator_login"
export default CoordinatorLogin;
