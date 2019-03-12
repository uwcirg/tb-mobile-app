import React from "react"
import { observer } from "mobx-react"

const WhenAuthenticated = observer(({ children, account }) => (
    account.registration.information.uuid ? <div>{children}</div> : null
  ))

export default WhenAuthenticated;