import React from 'react';
import Button from "../primitives/Button"
import InternalLink from "../primitives/InternalLink"
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

    <InternalLink backgroundColor={grey} to={InfoEd} store={store} >
      Atrás
    </InternalLink>

    <Button>Empezar</Button>
  </Layout>
))

TbQuiz.route = `/info/tb-quiz`
export default TbQuiz;
