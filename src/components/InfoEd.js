import React from "react"
import { Link } from "react-router-dom"

import { Button } from "reakit"

import TopBar from "./TopBar"
import BottomNav from "./BottomNav"

const InfoEd = () => (
  <div>
    <TopBar header='Información y Educación' />

    <div>
      <div>
        <div>
          <Button as={Link} to='/info/faqs'>
            Preguntas frecuentes<br /> y respuestas
          </Button>

          <Button as={Link} to='/info/symptom-overview'>
            Resumen de los síntomas<br /> y efectos secundarios
          </Button>

          <Button as={Link} to='/info/tb-quiz'>
            Prueba tu conocimiento<br /> sobre la tuberculosis!
          </Button>
        </div>
      </div>
    </div>

    <BottomNav />
  </div>
)

export default InfoEd;
