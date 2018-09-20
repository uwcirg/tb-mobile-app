import React from "react"
import { observer } from "mobx-react"
import { Button } from "reakit"

import Faqs from "./Faqs"
import SymptomOverview from "./SymptomOverview"
import TbQuiz from "./TbQuiz"

const InfoEd = observer(({ store }) => (
  <div>
    <Button onCLick={() => store.showPage(Faqs)} >
      Preguntas frecuentes<br /> y respuestas
    </Button>

    <Button onCLick={() => store.showPage(SymptomOverview)} >
      Resumen de los síntomas<br /> y efectos secundarios
    </Button>

    <Button onCLick={() => store.showPage(TbQuiz)} >
      Prueba tu conocimiento<br /> sobre la tuberculosis!
    </Button>
  </div>
))

export default InfoEd;
