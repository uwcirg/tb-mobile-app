import React from "react"
import styled from "styled-components"
import Button from "./primitives/Button"
import Layout from "./layouts/ListOfLinks"

const Login = ({store}) => (
  <Layout>
    <Button onClick={() => store.login()}>
      Registrarse
    </Button>

    <Button as={["a"]}
      href={ process.env.REACT_APP_API_PATH + "/account/signup" }
      >
      Crea una Cuenta
    </Button>
  </Layout>
)

export default Login;
