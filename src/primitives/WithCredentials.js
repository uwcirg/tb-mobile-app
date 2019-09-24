import React from "react"
import { observer,inject } from "mobx-react"

const AuthenticatedParticipant = inject("participantStore")(observer(({participantStore, children, assembly }) => (
  (participantStore.information && participantStore.information.uuid)
  ? <div>
      {children}
    </div>
  : null
  )))

const AuthenticatedCoordinator = inject("coordinatorStore")(observer(({coordinatorStore, children, assembly }) => (
  (coordinatorStore.email && coordinatorStore.participantRecords)
  ? <div>
      {children}
    </div>
  : null
  )))

export{ AuthenticatedParticipant, AuthenticatedCoordinator}
