import React from "react"
import { observer } from "mobx-react"

const WithCredentials = observer(({ children, account }) => (
  (account.information && account.information.uuid)
  ? <div>
      {children}
    </div>
  : null
  ))

export default WithCredentials;
