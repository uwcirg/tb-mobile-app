import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Register from "./Register"

const Login = observer(({store}) => (
  <Layout>
    <h2>
      {store.translate("login.welcome")}
    </h2>

    <Form>
      <Field
        type="tel"
        placeholder={store.translate("login.phone_number")}
        value={store.login_credentials.phone_number}
        onChange={(e) => store.login_credentials.phone_number = e.target.value}
      />

      <Field
        type="password"
        placeholder={store.translate("login.password")}
        value={store.login_credentials.password}
        onChange={(e) => store.login_credentials.password = e.target.value}
      />

      <Button onClick={() => store.login()}>
        {store.translate("login.go")}
      </Button>
    </Form>

    <InternalLink to={Register} store={store} >
      {store.translate("login.link.register")}
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

Login.route = "/login"
export default Login;
