import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white } from "../colors"
import InternalLink from "../primitives/InternalLink"

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
import Notes from "./Notes"

const BottomNav = observer(({ store }) => (
  <Layout>
    <InternalLink to={DailyCheckin} store={store} >
      <CalendarCheckIcon />
    </InternalLink>

    <InternalLink to={Messaging} store={store} >
      <EmailIcon />
    </InternalLink>

    <InternalLink to={InfoEd} store={store} >
      <InformationIcon />
    </InternalLink>

    <a href={ process.env.REACT_APP_CPRO_PATH+"/users/care" }>
      <ChartLineIcon />
    </a>

    <InternalLink to={Notes} store={store} >
      <PencilIcon />
    </InternalLink>
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
