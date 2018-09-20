import React from "react"
import { Button } from "reakit"
import { observer } from "mobx-react"

const DailyCheckin = observer(() => (
  <div>
    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=daily_check_in' } >
      Notificación Diaria
    </Button>

    <br />

    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=symptoms_side_effects' } >
      Mis Sintomas
    </Button>

    <br />

    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=mPOWer%20-%20Photo%20Upload' }  >
      Carga la Foto
    </Button>
  </div>
))

export default DailyCheckin;
