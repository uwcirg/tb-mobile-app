import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white, blue } from "../colors"
import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiCalendarCheck,
  mdiWhatsapp,
  mdiFolderClockOutline,
  mdiInformationOutline,
  mdiPencilBoxOutline,
  mdiHome,
} from "@mdi/js"

import Home from "./Home"
import InfoEd from "./InfoEd"
import Notes from "./Notes"
import Contact from "./Contact"
import Progress from "./Progress"

const Navigation = observer(({ store }) => (
  <Layout>
    <InternalLink to={Home} store={store} >
      <Icon path={mdiHome} color={blue} size="1.8rem" />
    </InternalLink>
  
    <InternalLink to={Progress} store={store} >
      <Icon path={mdiFolderClockOutline} size="1.8rem" />
    </InternalLink>

    <InternalLink to={Contact} store={store} >
      <Icon path={mdiWhatsapp} size="1.8rem" />
    </InternalLink>

    <InternalLink to={Notes} store={store} >
      <Icon path={mdiPencilBoxOutline} size="1.8rem" />
    </InternalLink>

    <InternalLink to={InfoEd} store={store} >
      <Icon path={mdiInformationOutline} size="1.8rem" />
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

export default Navigation;
