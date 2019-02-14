import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import Selection from "../primitives/Selection"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input } from "reakit"
import { white, grey } from "../colors"

const Login = observer(({store}) => (
  <Layout>
    <p>
      {store.translate("login.welcome")}
    </p>

    <Form>
      <Field
        placeholder={store.translate("login.initials")}
        value={store.account.initials}
        onChange={(e) => store.account.initials = e.target.value}
      />

      <Field
        placeholder={store.translate("login.phone")}
        value={store.account.phone_number}
        onChange={(e) => store.account.phone_number = e.target.value}
      />

      <Field
        placeholder={store.translate("login.date_of_birth")}
        value={store.account.date_of_birth}
        onChange={(e) => store.account.date_of_birth = e.target.value}
      />

      <Field
        placeholder={store.translate("login.treatment_start_date")}
        value={store.account.treatment_start_date}
        onChange={(e) => store.account.treatment_start_date = e.target.value}
      />

      <Button onClick={() => store.login()}>
        {store.translate("login.register")}
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

Login.route = "/login"
export default Login;
