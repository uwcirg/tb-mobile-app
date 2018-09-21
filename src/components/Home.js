// Core
import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"
import { Box, InlineBlock } from "reakit"
import { black, white, grey } from "../colors"
import Button from "../primitives/Button"

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
      <Left><CalendarCheckIcon /></Left>
      <Center>Notificación Diaria</Center>
    </Button>

    <Button onClick={() => store.showPage(Messaging)} >
      <Left><EmailIcon /></Left>
      <Center>Mensajería</Center>
    </Button>

    <Button onClick={() => store.showPage(InfoEd)} >
      <Left><InformationIcon /></Left>
      <Center>Información y Educación</Center>
    </Button>

    <Button as="a" href={process.env.REACT_APP_CPRO_PATH + "/users/care"} >
      <Left><ChartLineIcon /></Left>
      <Center>Mi Progreso</Center>
    </Button>

    <Button onClick={() => store.showPage(MyNotes)} >
      <Left><PencilIcon /></Left>
      <Center>Mis Notas</Center>
    </Button>
  </Layout>
))

const Layout = styled(Box)`
  display: flex;
  flex-direction: column;
  align-content: center;
  height: 100%;
  justify-content: center;
  align-items: center;

  & > ${Button} {
    min-width: 50%;
    color: ${black};
    background: ${white};
  }

  & > ${Button}:not(:last-child) {
    margin-bottom: 2rem;
  }

  & > ${Button}:nth-child(2n+1) {
    background: ${grey};
  }
`

const Center = styled(InlineBlock)`
`

const Left = styled(InlineBlock)`
  float: left;
`

export default Home;
