import React from "react"
import { observer } from "mobx-react"

import {
  mdiLock,
} from "@mdi/js"
import Icon from "@mdi/react"

const WhenAuthenticated = observer(({ children, account }) => (
  account.information.uuid
  ? <div>{children}</div>
  : <div><Icon size={1} path={mdiLock} /></div>
  ))

export default WhenAuthenticated;
