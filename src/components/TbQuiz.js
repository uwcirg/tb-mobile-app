import React from 'react';
import { Button } from "reakit"
import { observer } from "mobx-react"

const TbQuiz = observer(() => (
  <div>
    <h2>Prueba tu conocimiento sobre la tuberculosis!</h2>

    <p>
      Como sabe, ¡Hay muchos conceptos erróneos sobre la tuberculosis!
      Haga esta prueba divertida para poner a prueba su conocimiento
      y aprender más acerca de esta enfermedad
      relativamente común pero a menudo incomprendida.
    </p>

    <Button>Atrás</Button>
    <Button>Empezar</Button>
  </div>
))


export default TbQuiz;
