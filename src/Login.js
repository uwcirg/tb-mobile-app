import React from "react"
import styled from "styled-components"
import Button from "./primitives/Button"

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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > ${Button} {
    min-width: 50%;
  }

  & > ${Button}:not(:last-child) {
    margin-bottom: 2rem;
  }
`

export default Login;
