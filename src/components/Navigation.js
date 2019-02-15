import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white } from "../colors"
import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiCalendarCheck,
  mdiInformation,
  mdiPencil,
  mdiProgressCheck,
  mdiChat,
} from "@mdi/js"

import Home from "./Home"
import InfoEd from "./InfoEd"
import Notes from "./Notes"
import Contact from "./Contact"

const Navigation = observer(({ store }) => (
  <Layout>
    <InternalLink to={InfoEd} store={store} >
      <Icon path={mdiInformation} size="1.4rem" />
    </InternalLink>

    {/* progress page */}
    <InternalLink to={InfoEd} store={store} >
      <Icon path={mdiProgressCheck} size="1.4rem" />
    </InternalLink>

    <InternalLink to={Home} store={store} >
      <Icon path={mdiCalendarCheck} size="2.4rem" />
    </InternalLink>

    <InternalLink to={Contact} store={store} >
      <Icon path={mdiChat} size="1.4rem" />
    </InternalLink>

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

export default Navigation;
