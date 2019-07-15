import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import field from "../util/field"
import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import InternalLink from "../primitives/InternalLink"
import Register from "./Register"
import CoordinatorLogin from "./CoordinatorLogin"

const Login = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("participant_login.welcome")}
    </h2>

    <Form>
      {field(assembly, "participant_login.phone_number", "text").label}
      {field(assembly, "participant_login.phone_number", "text").field}

      {field(assembly, "participant_login.password", "password").label}
      {field(assembly, "participant_login.password", "password").field}

      <Button onClick={() => assembly.login()}>
        {assembly.translate("participant_login.go")}
      </Button>
    </Form>

    <InternalLink to={Register} assembly={assembly} >
      {assembly.translate("participant_login.link.register")}
    </InternalLink>

    <InternalLink to={CoordinatorLogin} assembly={assembly} >
      {assembly.translate("participant_login.link.coordinator_login")}
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

export default Login;
