import React from "react"
import { observer } from "mobx-react"
import Button from "../primitives/Button"
import Layout from "../layouts/ListOfLinks"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"
import TbQuiz from "./TbQuiz"

const InfoEd = observer(({ store }) => (
  <Layout>
    <Button onClick={() => store.showPage(Faqs)} >
      Preguntas frecuentes<br /> y respuestas
    </Button>

    <Button onClick={() => store.showPage(SymptomOverview)} >
      Resumen de los síntomas<br /> y efectos secundarios
    </Button>

    <Button onClick={() => store.showPage(TbQuiz)} >
      Prueba tu conocimiento<br /> sobre la tuberculosis!
    </Button>
  </Layout>
))

export default InfoEd;
