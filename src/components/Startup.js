import React from "react"

import { Button } from "reakit"
import LoginButton from "./LoginButton"

const Startup = ({login, isLoggedIn}) => (
  <div>
    <h1>TB Asistente Diario</h1>

    <div>
      <LoginButton login={login} />

      <Button as="a"
        href={ process.env.REACT_APP_API_PATH + "/account/signup" }
        >
        Crea una Cuenta
      </Button>
    </div>
  </div>
)

export default Startup;
