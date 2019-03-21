import React from "react"
import styled from "styled-components"

import { observer } from "mobx-react"
import InternalLink from "../primitives/InternalLink"
import ListOfLinks from "../layouts/ListOfLinks"
import Button from "../primitives/Button"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"

const InfoEd = observer(({ assembly }) => (
  <Layout>
    <Button as={InternalLink} to={Faqs} assembly={assembly} >
        {assembly.translate("info.faq")}
    </Button>

    <Button as={InternalLink} to={SymptomOverview} assembly={assembly} >
        {assembly.translate("info.symptom_overview")}
    </Button>

    <p>{assembly.translate("contact.second")} <a href="mailto:sjiribar@uw.edu" target="_blank">sjiribar@uw.edu</a></p>
  </Layout>
))

const Layout = styled(ListOfLinks)`
  & > ${Button} {
    width: 100%;
  }
`

InfoEd.route = "/info"
export default InfoEd;
