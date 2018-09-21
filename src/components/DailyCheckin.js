import React from "react"
import Button from "../primitives/Button"
import { observer } from "mobx-react"
import Layout from "../layouts/ListOfLinks"

const DailyCheckin = observer(() => (
  <Layout>
    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=daily_check_in' } >
      Notificación Diaria
    </Button>

    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=symptoms_side_effects' } >
      Mis Sintomas
    </Button>

    <Button as="a"
      href={ process.env.REACT_APP_CPRO_PATH+'/surveys/new_session?project=mPOWer%20-%20Photo%20Upload' }  >
      Carga la Foto
    </Button>
  </Layout>
))

export default DailyCheckin;
