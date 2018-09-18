import React from 'react';

import { Button } from "reakit"

import TopBar from './TopBar';
import BottomNav from './BottomNav';

const TbQuiz = () => (
  <div>
    <TopBar header='TB Quiz' />

    <div>
      <h2>Prueba tu conocimiento sobre la tuberculosis!</h2>
      <p>Como sabe, ¡Hay muchos conceptos erróneos sobre la tuberculosis! Haga esta prueba divertida para poner a prueba su conocimiento y aprender más acerca de esta enfermedad relativamente común pero a menudo incomprendida.</p>
      <Button>Atrás</Button>
      <Button>Empezar</Button>
    </div>

    <BottomNav />
  </div>
)


export default TbQuiz;
