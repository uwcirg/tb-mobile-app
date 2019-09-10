import React from "react"
import { observer,inject } from "mobx-react"

const AuthenticatedParticipant = inject("participantStore")(observer(({participantStore, children, assembly }) => (
  (participantStore.information && participantStore.information.uuid)
  ? <div>
      {children}
    </div>
  : null
  )))

const AuthenticatedCoordinator = observer(({ children, account }) => (
  (account.information && account.information.uuid)
  ? <div>
      {children}
    </div>
  : null
  ))

export{ AuthenticatedParticipant, AuthenticatedCoordinator}
