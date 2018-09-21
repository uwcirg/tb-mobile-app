import React from 'react';
import Button from "../primitives/Button"
import { observer } from "mobx-react"
import Layout from "../layouts/Text"
import { grey } from "../colors"

import InfoEd from "./InfoEd"

const TbQuiz = observer(({ store }) => (
  <Layout>
    <h2>Prueba tu conocimiento sobre la tuberculosis!</h2>

    <p>
      Como sabe, ¡Hay muchos conceptos erróneos sobre la tuberculosis!
      Haga esta prueba divertida para poner a prueba su conocimiento
      y aprender más acerca de esta enfermedad
      relativamente común pero a menudo incomprendida.
    </p>

    <Button backgroundColor={grey} onClick={() => store.showPage(InfoEd)} >
      Atrás
    </Button>

    <Button>Empezar</Button>
  </Layout>
))


export default TbQuiz;
