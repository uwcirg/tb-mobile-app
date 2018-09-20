// Core
import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import { Button, Grid } from "reakit"

import {
  CalendarCheckIcon,
  EmailIcon,
  InformationIcon,
  ChartLineIcon,
  PencilIcon,
} from "mdi-react"

import DailyCheckin from "./DailyCheckin"
import InfoEd from "./InfoEd"
import Messaging from "./Messaging"
import MyNotes from "./MyNotes"

const Home = observer(({ store }) => (
  <Layout>
    <Button onClick={() => store.showPage(DailyCheckin)} >
      <CalendarCheckIcon />
      Notificación Diaria
    </Button>

    <Button onClick={() => store.showPage(Messaging)} >
      <EmailIcon />
      Mensajería
    </Button>

    <Button onClick={() => store.showPage(InfoEd)} >
      <InformationIcon />
      Información y Educación
    </Button>

    <Button as="a" href={process.env.REACT_APP_CPRO_PATH + "/users/care"} >
      <ChartLineIcon />
      Mi Progreso
    </Button>

    <Button onClick={() => store.showPage(MyNotes)} >
      <PencilIcon />
      Mis Notas
    </Button>
  </Layout>
))

const Layout = styled(Grid)`
  columns: repeat(5, 1fr);

  & > ${Button}:nth-child(2n+1) {
    background: #c9c9c9;
  }

  & > ${Button}:nth-child(2n) {
    background: #ffffff;
  }
`

export default Home;
