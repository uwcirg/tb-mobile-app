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
      <Field
        placeholder={store.translate("register.name")}
        value={store.registration_information.name}
        onChange={(e) => store.registration_information.name = e.target.value}
      />

      <Field
        placeholder={store.translate("register.phone")}
        value={store.registration_information.phone_number}
        onChange={(e) => store.registration_information.phone_number = e.target.value}
      />

      <Field
        placeholder={store.translate("register.treatment_start_date")}
        value={store.registration_information.treatment_start_date}
        onChange={(e) => store.registration_information.treatment_start_date = e.target.value}
      />

      <Field
        password
        placeholder={store.translate("register.password")}
        value={store.registration_information.password}
        onChange={(e) => store.registration_information.password = e.target.value}
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
