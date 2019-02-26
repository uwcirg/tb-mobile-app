import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import Selection from "../primitives/Selection"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"

const Register = observer(({store}) => (
  <Layout>
    <p>
      {store.translate("register.welcome")}
    </p>

    <Form>
      <Field
        placeholder={store.translate("register.name")}
        value={store.register.name}
        onChange={(e) => store.register.name = e.target.value}
      />

      <Field
        placeholder={store.translate("register.phone")}
        value={store.register.phone_number}
        onChange={(e) => store.register.phone_number = e.target.value}
      />

      <Field
        placeholder={store.translate("register.treatment_start_date")}
        value={store.register.treatment_start_date}
        onChange={(e) => store.register.treatment_start_date = e.target.value}
      />

      <Field
        password
        placeholder={store.translate("register.password")}
        value={store.register.password}
        onChange={(e) => store.register.password = e.target.value}
      />

      <Button onClick={() => store.register()}>
        {store.translate("register.register")}
      </Button>
    </Form>
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
