import React from "react"
import { observer } from "mobx-react"
import InternalLink from "../primitives/InternalLink"
import Layout from "../layouts/ListOfLinks"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"
import TbQuiz from "./TbQuiz"

const InfoEd = observer(({ store }) => (
  <Layout>
    <InternalLink to={Faqs} store={store} >
      Preguntas frecuentes<br /> y respuestas
    </InternalLink>

    <InternalLink to={SymptomOverview} store={store} >
      Resumen de los síntomas<br /> y efectos secundarios
    </InternalLink>

    <InternalLink to={TbQuiz} store={store} >
      Prueba tu conocimiento<br /> sobre la tuberculosis!
    </InternalLink>
  </Layout>
))

InfoEd.route = "/info"
export default InfoEd;
