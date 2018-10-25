import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white } from "../colors"
import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiCalendarCheck,
  mdiEmail,
  mdiInformation,
  mdiChartLine,
  mdiPencil,
} from "@mdi/js"

import Home from "./Home"
import InfoEd from "./InfoEd"
import Messaging from "./Messaging"
import Notes from "./Notes"

const BottomNav = observer(({ store }) => (
  <Layout>
    <InternalLink to={Messaging} store={store} >
      <Icon path={mdiEmail} size="1.4rem" />
    </InternalLink>

    <InternalLink to={InfoEd} store={store} >
      <Icon path={mdiInformation} size="1.4rem" />
    </InternalLink>

    <InternalLink to={Home} store={store} >
      <Icon path={mdiCalendarCheck} size="2.4rem" />
    </InternalLink>

    <a href={ process.env.REACT_APP_CPRO_PATH+"/users/care" }>
      <Icon path={mdiChartLine} size="1.4rem" />
    </a>

    <InternalLink to={Notes} store={store} >
      <Icon path={mdiPencil} size="1.4rem" />
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
