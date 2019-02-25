import React from "react"
import styled from "styled-components"

import { observer } from "mobx-react"
import InternalLink from "../primitives/InternalLink"
import ListOfLinks from "../layouts/ListOfLinks"
import Button from "../primitives/Button"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"

const InfoEd = observer(({ store }) => (
  <Layout>
    <Button as={InternalLink} to={Faqs} store={store} >
        {store.translate("info.faq")}
    </Button>

    <Button as={InternalLink} to={SymptomOverview} store={store} >
        {store.translate("info.symptom_overview")}
    </Button>
  </Layout>
))

const Layout = styled(ListOfLinks)`
  & > ${Button} {
    width: 100%;
  }
`

InfoEd.route = "/info"
export default InfoEd;
