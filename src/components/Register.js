import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Button from "../primitives/Button"
import ListOfLinks from "../layouts/ListOfLinks"
import { Input, Provider } from "reakit"
import { white, grey } from "../colors"
import InternalLink from "../primitives/InternalLink"
import Login from "./Login"
import CoordinatorLogin from "./CoordinatorLogin"
import InputMask from "react-input-mask"
import theme from "reakit-theme-default";

const Register = observer(({assembly}) => (
  // <Layout>
    <Provider theme={theme}>
    <div>
    <h2>
      {assembly.translate("register.welcome")}
    </h2>
    
    <Form>
      <label for="name">{assembly.translate("register.name")}</label>
      <Field
        name="name"
        value={assembly.registration.information.name || ""}
        onChange={(e) => assembly.registration.information.name = e.target.value}
      />

      <label for="phone_number">{assembly.translate("register.phone_number")}</label>
      {/* <Field
        name="phone_number"
        type="tel"
        value={assembly.registration.information.phone_number || ""}
        onChange={(e) => assembly.registration.information.phone_number = e.target.value}
      /> */}
      <InputMask mask="+5\4 99 9999 9999" maskChar={null} 
        name="phone_number"
        type="tel"
        value={assembly.registration.information.phone_number || ""}
        onChange={(e) => assembly.registration.information.phone_number = e.target.value}
      />

      <label for="treatment_start">{assembly.translate("register.treatment_start")}</label>
      <Field
        type="date"
        value={assembly.registration.information.treatment_start || ""}
        onChange={(e) => assembly.registration.information.treatment_start = e.target.value}
      />

      <label for="password">{assembly.translate("register.password")}</label>
      <Field
        type="password"
        value={assembly.registration.information.password || ""}
        onChange={(e) => assembly.registration.information.password = e.target.value}
      />

      <Button onClick={() => assembly.register()}>
        {assembly.translate("register.register")}
      </Button>
    </Form>

    <InternalLink to={Login} assembly={assembly} >
      {assembly.translate("register.link.login")}
    </InternalLink>

    <InternalLink to={CoordinatorLogin} assembly={assembly} >
      {assembly.translate("login.link.coordinator_login")}
    </InternalLink>
    </div>
    </Provider>
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

const FormatTest = styled(Input)`
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
