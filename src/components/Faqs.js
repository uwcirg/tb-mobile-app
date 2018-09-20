import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const FAQs = observer(() => (
  <FaqMain>
    <h4>Preguntas frecuentes y respuestas</h4>

    <InfoText>
      <p>
        Esta es una lista de preguntas frecuentes sobre la tuberculosis (TB),
        medicamentos y otros temas relacionados con TB y las respuestas.
        Qué es, cómo se transmite, y cómo trata la tuberculosis.
        Si tiene Ud preguntas sobre
        <a href=''> síntomas o efectos secundarios</a>,
        por favor vea a la página
        <a href=''> Resumen de los síntomas y efectos secundarios.</a>
      </p>

      <h5>¿Qué es la tuberculosis?</h5>
      <p>
        Es una enfermedad contagiosa
        que afecta principalmente a los pulmones,
        pero que puede atacar otras partes del cuerpo,
        llegando a ser muy grave.
        Lo causa una bacteria conocida como "bacilo de Koch"
        que se contagia por el aire.
        Si no se trata oportunamente,
        puede causar daño permanente en los pulmones.
      </p>

      <h5>¿Cómo se transmite la tuberculosis?</h5>
      <p>
        Los enfermos que no están en tratamiento,
        al toser o estornudar eliminan las bacterias al aire,
        que entran a los pulmones de la persona sana.
        Para que se produzca el contagio,
        el contacto debe ser diario.
        Pero cuando la persona enferma
        se encuentra haciendo tratamiento no contagia a otras personas.
        Es importante aclarar que la tuberculosis no se contagia
        por compartir el mate, cubiertos, vasos, etc.
        con una persona enferma.
      </p>

      <h5>¿Cuáles son las pruebas para detectar la infección?</h5>
      <p>
        Para conocer si una persona estuvo en contacto o no con el bacilo
        es a través de la prueba en la piel,
        la reacción de Mantoux o prueba tuberculínica.
      </p>

      <h5>¿Cómo se trata la enfermedad de tuberculosis?</h5>
      <p>
        Detectar la tuberculosis en forma temprana
        es una de las principales herramientas
        para combatir la enfermedad.
        Con el tratamiento adecuado
        durante el tiempo indicado por el médico,
        la persona enferma logra curarse sin contagiar a otros.
        El tratamiento de la tuberculosis dura más de 6 meses
        para que una persona se cure totalmente.
        Se debe tomar la medicación frente al personal de salud
        que acompaña y ayuda a terminar el tratamiento.
        Los síntomas suelen mejoran en 2 a 3 semanas.
        El pronóstico es excelente si la tuberculosis pulmonar
        se diagnostica a tiempo y el tratamiento se inicia rápidamente.
      </p>

      <h5>¿Cuáles son los efectos secundarios indeseables de los medicamentos para la tuberculosis?</h5>
      <p>
        Los medicamentos utilizados pueden
        provocar algunos efectos indeseables
        que hay que tener en cuenta para consultar con el equipo de salud.
        Efectos puede ocasionarle y en algunos casos debería consultar.
        Algunos efectos secundarios son mínimos y otros son más serios.
        Si tiene un efecto secundario grave,
        llame a su médico o enfermera inmediatamente.
        Es posible que le indiquen que deje de tomar sus medicamentos
        o que vaya a la clínica para que le hagan pruebas.
      </p>

      <h5>¿Por qué tengo que tomar medicamentos para la tuberculosis en forma regular?</h5>
      <p>
        Las bacterias de la tuberculosis mueren muy lentamente.
        Los medicamentos tardan por lo menos 6 meses
        en destruir todas las bacterias de la tuberculosis.
        Usted probablemente empezará a sentirse bien
        después de solo algunas semanas de tratamiento.
        ¡Pero tenga en cuenta lo siguiente!
        Las bacterias de la tuberculosis aún están vivas en su cuerpo.
        Debe seguir tomando sus medicamentos hasta que todas las bacterias
        de la tuberculosis estén muertas,
        aun cuando usted se sienta mejor
        y no tenga más síntomas de enfermedad de tuberculosis.
      </p>

      <h5>¿Cómo puedo acordarme de tomar mis medicamentos?</h5>
      <p>
        La única forma curarse es tomando sus medicamentos exactamente
        según las indicaciones de su médico/a o enfermero/a.
        ¡Puede que no sea fácil!
        ya que deberá tomar sus medicamentos
        durante un tiempo prolongado (6 meses),
        es bueno que establezca una rutina.
      </p>
    </InfoText>
  </FaqMain>
))

const FaqMain = styled.div`
  height: 78vh;
`

const InfoText = styled.div`
  height: 73vh;
`

export default FAQs;
