import React from "react"
import Button from "./primitives/Button"
import styled from "styled-components"
import ListOfLinks from "./layouts/ListOfLinks"

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

const Layout = styled(ListOfLinks)`
  background-size: cover;
  background-image: url(/images/tb-bg.jpg);
`

Login.route = "/login"
export default Login;
