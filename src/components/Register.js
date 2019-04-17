import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import field from "../util/field"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import InternalLink from "../primitives/InternalLink"
import Login from "./Login"
import CoordinatorLogin from "./CoordinatorLogin"

const Register = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("participant_registration.welcome")}
    </h2>

    <Form>
      {field(assembly, "participant_registration.name").label}
      {field(assembly, "participant_registration.name").field}

      {field(assembly, "participant_registration.phone_number", "tel").label}
      <label>54-911-0000-2222</label>
      {field(assembly, "participant_registration.phone_number", "tel").field}

      {field(assembly, "participant_registration.treatment_start", "date").label}
      {field(assembly, "participant_registration.treatment_start", "date").field}

      {field(assembly, "participant_registration.password", "password").label}
      {field(assembly, "participant_registration.password", "password").field}

      <Button onClick={() => assembly.register_participant()}>
        {assembly.translate("participant_registration.register")}
      </Button>
    </Form>

    <InternalLink to={Login} assembly={assembly} >
      {assembly.translate("participant_registration.link.login")}
    </InternalLink>

    <InternalLink to={CoordinatorLogin} assembly={assembly} >
      {assembly.translate("login.link.coordinator_login")}
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

Register.route = "/register"
export default Register;
