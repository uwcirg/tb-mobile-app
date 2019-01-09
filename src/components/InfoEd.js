import React from "react"
import styled from "styled-components"

import { observer } from "mobx-react"
import InternalLink from "../primitives/InternalLink"
import ListOfLinks from "../layouts/ListOfLinks"
import Button from "../primitives/Button"
import { grey, lightgrey, black } from "../colors"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"

const InfoEd = observer(({ store }) => (
  <Layout>
    <Button as="div">
      <InternalLink to={Faqs} store={store} >
        Preguntas frecuentes<br /> y respuestas
      </InternalLink>
    </Button>

    <Button as="div">
      <InternalLink to={SymptomOverview} store={store} >
        Resumen de los síntomas<br /> y efectos secundarios
      </InternalLink>
    </Button>
  </Layout>
))

const Layout = styled(ListOfLinks)`
  & > ${Button} {
    min-width: 50%;
    background-color: ${grey};

    a {
      color: ${black}
      text-decoration: none;
    }
  }

  & > ${Button}:nth-child(2n) {
    background-color: ${lightgrey};
  }
`

InfoEd.route = "/info"
export default InfoEd;
