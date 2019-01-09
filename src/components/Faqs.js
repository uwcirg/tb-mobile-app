import React from "react"
import { observer } from "mobx-react"
import Layout from "../layouts/Text"
import styled from "styled-components"
import Fold from "../primitives/Fold"

import {
  Paragraph,
  List,
} from "reakit"

const FAQs = observer(() => (
  <Layout>
    <Title>Preguntas y respuestas sobre la tuberculosis</Title>

    <P>
      Esta es una lista de preguntas frecuentes sobre la tuberculosis (TB),
      medicamentos y otros temas relacionados con TB y las respuestas.
    </P>

    <P>
      Qué es, cómo se transmite, y cómo se trata la tuberculosis.
    </P>

    <Fold>
      <Question>
        ¿Qué es?
      </Question>

      <Answer>
        <P>
          La tuberculosis o TB es una enfermedad causada por el bacilo de Koch o
          <ScientificName>Mycobacterium tuberculosis</ScientificName>.
          La infección principal de la enfermedad se produce en los pulmones,
          si bien puede atacar otras partes del cuerpo,
          la TB pulmonar es la única con capacidad de contagiar a otras personas
          que se encuentran en un contacto habitual y cercano varias horas en el
          día. Contagio que se produce a través del aire al
          toser/estornudar/hablar/cantar y eliminar con la tos las pequeñas
          gotitas que contienen a los bacilos vivos.
        </P>
        <P>
          No todas las personas en contacto con un enfermo que elimina los
          bacilos con la tos, pueden llegar a enfermarse. Solamente en el caso
          que la otra persona tenga las defensas bajas, por la presencia de
          otras enfermedades como diabetes, otras infecciones como el virus del
          SIDA, tumores, trasplantes, mala nutrición, pueden llegar a
          enfermarse.
        </P>
        <P>
          Con buenas defensas un individuo puede tomar contacto con el bacilo,
          pero no necesariamente puede llegar a enfermarse, sino a infectarse,
          sin desarrollar la enfermedad. En este caso conocido como infección.
          Estas personas no se sienten mal, no presentan síntomas ni pueden
          transmitir la tuberculosis a otras personas. Sin embargo, algunas
          personas con la infección se enferman más adelante de la enfermedad
          de tuberculosis.
        </P>
        <P>
          La buena noticia es que las personas con la enfermedad de
          tuberculosis pueden recibir tratamiento y curarse.
        </P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Cómo se transmite?
      </Question>

      <Answer>
        <P>
          La tuberculosis se transmite de una persona a otra por el aire.
          Los bacilos se liberan en el aire
          cuando una persona con la enfermedad de tuberculosis en los pulmones
          o la garganta tose, estornuda, habla o canta.
          Las personas que se encuentran cerca
          pueden respirar estos bacilos e infectarse.
        </P>
        <P>
          Cuando una persona respira las bacterias de la tuberculosis,
          estas pueden alojarse en los pulmones y comenzar a proliferar.
          Desde allí se pueden desplazar
          por la sangre hacia otras partes del cuerpo,
          como los riñones, la columna vertebral y el cerebro.
        </P>
        <P>
          La enfermedad de tuberculosis en los pulmones o la garganta puede ser
          contagiosa. Esto significa que los bacilos pueden transmitirse a
          otras personas. La tuberculosis que afecta otras partes del cuerpo,
          como los riñones o la columna vertebral, por lo general no es
          contagiosa.
        </P>
        <P>
          Las personas con la enfermedad de tuberculosis tienen más
          probabilidad de transmitirla a las personas con las que conviven
          todos los días, como familiares, amigos y compañeros de trabajo y de
          clase.
        </P>
        <P>
          Es importante:

          <Bullets>
            <Bullet>
              controlar a TODOS los contactos que viven con la persona que
              tiene TB.
            </Bullet>
            <Bullet>
              Vacunar al recién nacido con la vacuna BCG para prevenir las
              formas graves TB
            </Bullet>
            <Bullet>
              Cubrirse la boca al toser o estornudar.
            </Bullet>
            <Bullet>
              Enseñar en las escuelas, en el barrio y en la comunidad que TODOS
              debemos participar de la lucha contra la Tuberculosis.
            </Bullet>
          </Bullets>
        </P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Cuáles son las pruebas para detectar la infección?
      </Question>

      <Answer>
        <P>
          Para conocer si una persona estuvo en contacto o no con el bacilo
          es a través de la prueba en la piel,
          la reacción de Mantoux o prueba tuberculínica.
        </P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Cómo se trata?
      </Question>

      <Answer>
        <P>
          El tratamiento es altamente efectivo, pudiendo curar a todos los
          pacientes. La eficacia del tratamiento consiste en la toma regular y
          diaria de los medicamentos. Se necesita la combinación de varios
          medicamentos para eliminar la mayor cantidad de los bacilos sobre
          todo en los 2 primeros meses. El tratamiento debe continuarse con una
          segunda fase de 4 meses, necesaria para mater al resto de los bacilos
          que aún permanecen en el organismo.
        </P>
        <P>
          Si usted tiene la enfermedad de tuberculosis en los pulmones o la
          garganta, es probable que la enfermedad sea contagiosa. Debe quedarse
          en su casa y no ir al trabajo o la escuela, para no transmitir las
          bacterias de la tuberculosis a otras personas. Después de tomar los
          medicamentos durante algunas semanas se sentirá mejor y es posible
          que la enfermedad ya no sea contagiosa. Su médico o enfermera le
          indicarán cuándo puede volver al trabajo, la escuela o a ver a sus
          amigos.
        </P>
        <P>
          El hecho de tener la enfermedad de tuberculosis no debe impedirle
          llevar una vida normal. Cuando la enfermedad ya no sea contagiosa y
          usted no se sienta mal, podrá hacer las mismas cosas que hacía antes
          de la enfermedad.
        </P>
        <P>
          Es importante el control del catarro principalmente en los 2 primeros
          meses, antes de pasar a la segunda fase del tratamiento, además de
          los análisis de rutina.
        </P>
        <P>
          Utilizaría tratamiento directamente observado (TDO), cuando un
          personal de salud supervisa la toma de la medicación. En general, el
          tratamiento supervisado es realizado en un centro de salud cercano al
          domicilio. En los 2 primeros meses la supervisión en la toma de los
          medicamentos es diaria, mientras que en los siguientes 4 meses puede
          realizarse en tratamiento de 2 a 3 tomas por semana.
        </P>
        <P>
          Hay muchas razones por las cuales las personas tienen problemas para
          tomar sus medicamentos. Pero en la mayoría de los casos, hay algo que
          se puede hacer.
        </P>
        <P strong>
          Tanto el diagnóstico como el tratamiento de la Tuberculosis son
          gratuitos en los centros de salud y hospitales públicos de todo el
          país.
        </P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Cuáles son los efectos indeseables de los medicamentos para la tuberculosis?
      </Question>

      <Answer>
        <P>
          Los medicamentos utilizados pueden provocar algunos efectos indeseables que hay que tener en cuenta para consultar con el equipo de salud. Efectos puede ocasionarle y en algunos casos debería consultar.
        </P>
        <P>
          Algunos efectos secundarios son mínimos y otros son más serios.
          Si tiene un efecto secundario grave,
          <strong>llame a su médico o enfermera inmediatamente</strong>.
          Es posible que le indiquen que deje de tomar sus medicamentos
          o que vaya a la clínica para que le hagan pruebas.
        </P>
        <P>
          <Underline>
            Llame a su médico u otros servicios de emergencia de inmediato si tiene:
          </Underline>
        </P>
        <Bullets>
          <Bullet>Dificultad para respirar.</Bullet>
          <Bullet>Hinchazón de la cara, los labios, la lengua o la garganta</Bullet>
        </Bullets>

        <P>
          <Underline>
            Los efectos secundarios que se indican a continuación se consideran graves.
          </Underline>
          Si tiene alguno de estos síntomas, llame inmediatamente a su médico o enfermera:
        </P>
        <Bullets>
          <Bullet>Falta de apetito</Bullet>
          <Bullet>Náuseas</Bullet>
          <Bullet>Vómito</Bullet>
          <Bullet>Coloración amarilla de la piel o los ojos</Bullet>
          <Bullet>Fiebre durante 3 o más días</Bullet>
          <Bullet>Dolor abdominal</Bullet>
          <Bullet>Sensación de hormigueo en los dedos de las manos o de los pies</Bullet>
          <Bullet>Dolor en la parte inferior del pecho y acidez estomacal</Bullet>
          <Bullet>Comezón</Bullet>
          <Bullet>Sarpullido</Bullet>
          <Bullet>Aparición fácil de moretones</Bullet>
          <Bullet>Sangrado en las encías</Bullet>
          <Bullet>Sangrado en la nariz</Bullet>
          <Bullet>Orina oscura o de color café</Bullet>
          <Bullet>Dolor en las articulaciones</Bullet>
          <Bullet>Mareo</Bullet>
          <Bullet>Sensación de hormigueo o entumecimiento alrededor de la boca</Bullet>
          <Bullet>Vista borrosa o cambios en la vista</Bullet>
          <Bullet>Zumbido en los oídos</Bullet>
          <Bullet>Pérdida de la audición</Bullet>
        </Bullets>

        <P>
          <Underline>
            Los efectos secundarios a continuación se consideran leves.
          </Underline>
          Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.
        </P>
        La rifampicina puede:
        <P>
        </P>
        <Bullets>
          <Bullet>
            Hacer que la orina, la saliva o las lágrimas tengan una coloración
            naranja. Es posible que el equipo de salud le aconsejen que no use
            lentes de contacto blandos porque pueden mancharse.
          </Bullet>
          <Bullet>
            Aumentar su sensibilidad al sol. Esto significa que debe usar un
            buen filtro solar y cubrir las áreas expuestas para evitar
            quemaduras.
          </Bullet>
          <Bullet>
            Hacer que las píldoras y los implantes anticonceptivos sean menos
            eficaces. Las mujeres que toman rifampicina deben usar otro método
            anticonceptivo.
          </Bullet>
          <Bullet>
            Si usted está tomando rifampicina y metadona (que se usa para
            tratar las adicciones), es posible que tenga síntomas de
            abstinencia. Su médico o enfermera tal vez tengan que ajustarle la
            dosis de metadona.
          </Bullet>
        </Bullets>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Por qué tengo que tomar medicamentos para la tuberculosis en forma regular?
      </Question>

      <Answer>
        <P>
          Las bacterias de la tuberculosis mueren muy lentamente. Los
          medicamentos tardan por lo menos 6 meses en destruir todas las
          bacterias de la tuberculosis. Usted probablemente empezará a sentirse
          bien después de solo algunas semanas de tratamiento. ¡Pero tenga en
          cuenta lo siguiente! Las bacterias de la tuberculosis aún están vivas
          en su cuerpo. Debe seguir tomando sus medicamentos hasta que todas
          las bacterias de la tuberculosis estén muertas, aun cuando usted se
          sienta mejor y no tenga más síntomas de enfermedad de tuberculosis.
        </P>
        <P>
          Puede ser muy peligroso si no sigue tomando sus medicamentos o si no
          los toma en forma regular. Las bacterias de la tuberculosis se
          multiplicarán nuevamente y usted seguirá enfermo por más tiempo.
          Además, las bacterias pueden volverse resistentes a los medicamentos
          que esté tomando. Es posible que necesite medicamentos diferentes
          para eliminar las bacterias de la tuberculosis si los que usaba antes
          ya no le funcionan. Estos nuevos medicamentos se deben tomar durante
          más tiempo y, por lo general, tienen efectos secundarios más graves.
        </P>
        <P>
          Si su enfermedad vuelve a ser contagiosa, podría transmitir las
          bacterias de la tuberculosis a su familia, sus amigos o a cualquier
          persona que pase tiempo con usted. Es muy importante que tome sus
          medicamentos de acuerdo a las indicaciones de su médico o enfermera.
        </P>
      </Answer>
    </Fold>

    <Fold>
      <Question>
        ¿Cómo puedo acordarme de tomar mis medicamentos?
      </Question>

      <Answer>
        <P>
          La única forma curarse es tomando sus medicamentos exactamente según
          las indicaciones de su médico/a o enfermero/a. ¡Puede que no sea
          fácil! ya que deberá tomar sus medicamentos durante un tiempo
          prolongado (6 meses), es bueno que establezca una rutina. Estas son
          algunas formas de acordarse de tomar sus medicamentos:
        </P>

        <Bullets>
          <Bullet>
            Tomar sus medicamentos todos los días a la misma hora, por ejemplo,
            antes del desayuno, al hacer una pausa regular como para tomarse un
            café o después de cepillarse los dientes.
          </Bullet>
          <Bullet>
            Pedir a un familiar o amigo que le recuerde tomar sus píldoras.
          </Bullet>
          <Bullet>
            Marcar en un calendario cada día que tome sus medicamentos.
          </Bullet>
          <Bullet>
            Colocar sus medicamentos en un pastillero semanal. Téngalo junto a
            su cama o en su cartera o bolsillo.
          </Bullet>
        </Bullets>

        <Note>
          NOTA: Recuerde mantener todos los medicamentos fuera del alcance de
          los niños.
        </Note>

        <P>
          Si se olvida un día de tomar sus medicamentos,
          sáltese esa dosis y espere a tomar la dosis que le toca después.
          Infórmele a su médico o su enfermera que dejó de tomar una dosis.
          También los puede llamar para preguntar qué debe hacer.
        </P>

        <P underline>
          Preguntas de pacientes en el último estudio:
        </P>
        <Bullets>
          <Bullet>
            ¿Cómo se contagia la Tuberculosis?
            Al respirar y no hablar en una habitación se contagia de la tuberculosis?
          </Bullet>
          <Bullet>
            ¿Alguna de las pastillas puede dar alguna reacción alérgica? Porqué
            me salen como unas ronchitas que me pican?
          </Bullet>
          <Bullet>
            Puedo estar en la cama de mi mamá?
          </Bullet>
          <Bullet>
            A noche traspire mucho estaba toda mojada
          </Bullet>
          <Bullet>
            Podría tomar algún suplemento vitamínico, como esos que vienen para
            hacer batidos, estilo "ensure"?
          </Bullet>
          <Bullet>
            Me duele mucho el pecho
          </Bullet>
          <Bullet>
            Ya voy 1 mes de tratamiento todavía contagio? Se que tengo para 6
            meses para seguir.
          </Bullet>
          <Bullet>
            Hasta cuando tengo que usar el barbijo?
          </Bullet>
          <Bullet>
            El síntoma es los dolores de hombro, brazos, y mano, no sé si son
            los huesos, estoy desde el lunes esto es normal?
          </Bullet>
          <Bullet>
            La persona que están con este tratamiento al embarazarse que
            consecuencias trae, o no pueden embarazarse?
          </Bullet>
        </Bullets>
      </Answer>
    </Fold>
  </Layout>
))

const Answer = styled.div`
`

const Bullet = styled.li`
  margin-top: 0.5rem;
`

const Bullets = styled(List)`
  list-style: inside;
`

const Note = styled(Paragraph)`
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

const Question = styled.h3`
  font-weight: 100;
  margin: 0;
`

const ScientificName = styled.span`
  text-decoration: underline;
`

const Title = styled.h2`
`

const Underline = styled.span`
  text-decoration: underline;
`

FAQs.route = `/info/faqs`
export default FAQs;
