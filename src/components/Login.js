import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Register from "./Register"
import CoordinatorLogin from "./CoordinatorLogin"

const Login = observer(({assembly}) => (
  <Layout>
    <h2>
      {assembly.translate("login.welcome")}
    </h2>

    <Form>
      <Field
        type="tel"
        placeholder={assembly.translate("login.phone_number")}
        value={assembly.login_credentials.phone_number}
        onChange={(e) => assembly.login_credentials.phone_number = e.target.value}
      />

      <Field
        type="password"
        placeholder={assembly.translate("login.password")}
        value={assembly.login_credentials.password}
        onChange={(e) => assembly.login_credentials.password = e.target.value}
      />

      <Button onClick={() => assembly.login()}>
        {assembly.translate("login.go")}
      </Button>
    </Form>

    <InternalLink to={Register} assembly={assembly} >
      {assembly.translate("login.link.register")}
    </InternalLink>

    <InternalLink to={CoordinatorLogin} assembly={assembly} >
      {assembly.translate("login.link.coordinator_login")}
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

export default Login;
