import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white } from "../colors"
import { Button } from "reakit"

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

const BottomNav = observer(({ store }) => (
  <Layout>
    <Button onClick={() => store.showPage(DailyCheckin)} >
      <CalendarCheckIcon />
    </Button>

    <Button onClick={() => store.showPage(Messaging)} >
      <EmailIcon />
    </Button>

    <Button onClick={() => store.showPage(InfoEd)} >
      <InformationIcon />
    </Button>

    <Button as="a" href={ process.env.REACT_APP_CPRO_PATH+"/users/care" }>
      <ChartLineIcon />
    </Button>

    <Button onClick={() => store.showPage(MyNotes)} >
      <PencilIcon />
    </Button>
  </Layout>
))

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  background-color: ${white};
  padding: 1rem;
`

export default BottomNav;
