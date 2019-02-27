import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Login from "./Login"

const Register = observer(({store}) => (
  <Layout>
    <h2>
      {store.translate("register.welcome")}
    </h2>

    <Form>
      <label for="name">{store.translate("register.name")}</label>
      <Field
        name="name"
        value={store.registration.information.name || ""}
        onChange={(e) => store.registration.information.name = e.target.value}
      />

      <label for="phone_number">{store.translate("register.phone_number")}</label>
      <Field
        name="phone_number"
        type="tel"
        value={store.registration.information.phone_number || ""}
        onChange={(e) => store.registration.information.phone_number = e.target.value}
      />

      <label for="treatment_start">{store.translate("register.treatment_start")}</label>
      <Field
        type="date"
        value={store.registration.information.treatment_start || ""}
        onChange={(e) => store.registration.information.treatment_start = e.target.value}
      />

      <label for="password">{store.translate("register.password")}</label>
      <Field
        type="password"
        value={store.registration.information.password || ""}
        onChange={(e) => store.registration.information.password = e.target.value}
      />

      <Button onClick={() => store.register()}>
        {store.translate("register.register")}
      </Button>
    </Form>

    <InternalLink to={Login} store={store} >
      {store.translate("register.link.login")}
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

Register.route = "/register"
export default Register;
