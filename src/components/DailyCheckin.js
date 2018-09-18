import React from "react"

import BottomNav from "./BottomNav"
import TopBar from "./TopBar"

import { Button } from "reakit"

const DailyCheckin = () => (
  <div>
    <TopBar header="Notificación Diaria" />

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

    <BottomNav />
  </div>
)


export default DailyCheckin;
