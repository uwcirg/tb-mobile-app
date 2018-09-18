// Core
import React from "react";
import styled from "styled-components"

// UI Primitives
import { Button, Grid } from "reakit"

// Utilities
import { Link } from "react-router-dom";

// Other
import TopBar from "./TopBar";

import {
  CalendarCheckIcon,
  EmailIcon,
  InformationIcon,
  ChartLineIcon,
  PencilIcon,
} from "mdi-react"

const Home = () => (
  <div>
    <TopBar header="Inicio" />

    <Layout>
      <Button background="#c9c9c9" as={Link} to='/daily-checkin'>
        <CalendarCheckIcon />
        Notificación Diaria
      </Button>

      <Button background="#ffffff" as={Link} to='/messages'>
        <EmailIcon />
        Mensajería
      </Button>

      <Button background="#c9c9c9" as={Link} to='/info'>
        <InformationIcon />
        Información y Educación
      </Button>

      <Button background="#ffffff" as="a" href={ process.env.REACT_APP_CPRO_PATH+'/users/care' } >
        <ChartLineIcon />
        Mi Progreso
      </Button>

      <Button background="#c9c9c9" as={Link} to='/my-notes'>
        <PencilIcon />
        Mis Notas
      </Button>
    </Layout>
  </div>
)

const Layout = styled(Grid)`
  columns: repeat(5, 1fr);
`

export default Home;
