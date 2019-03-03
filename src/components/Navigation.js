import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white, primary, black } from "../colors"
import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
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
      <Icon
        path={mdiHome}
        color={store.currentPage === Home ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={Progress} store={store} >
      <Icon
        path={mdiFolderClockOutline}
        color={store.currentPage === Progress ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={Contact} store={store} >
      <Icon
        path={mdiWhatsapp}
        color={store.currentPage === Contact ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={Notes} store={store} >
      <Icon
        path={mdiPencilBoxOutline}
        color={store.currentPage === Notes ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={InfoEd} store={store} >
      <Icon
        path={mdiInformationOutline}
        color={store.currentPage === InfoEd ? primary : black}
        size="1.8rem"
      />
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
