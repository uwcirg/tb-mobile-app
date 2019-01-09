import React from "react"
import Fold from "../primitives/Fold"
import Layout from "../layouts/Text"
import styled from "styled-components"
import { observer } from "mobx-react"
import {
  Paragraph,
  List,
} from "reakit"

const SymptomOverview = observer(() => (
  <Layout>
    <Title>
      Resumen de los síntomas/efectos indeseables
      y estrategias para intentar en casa para reducir los efectos secundarios
    </Title>

    <P>
      Los medicamentos utilizados pueden provocar algunos efectos indeseables.
      ¿Qué hay que tener en cuenta para consultar con el equipo de salud?
      ¿Qué efectos podrían presentarse y en qué casos debería consultar?
    </P>
    <P>
      La mayoría de las personas pueden tomar los medicamentos para la TB sin ningún problema.
    </P>
    <P>
      Algunos efectos secundarios son mínimos y otros son más serios.
      Si tiene un efecto secundario grave,
      <strong>llame a su médico o concurra a la guardia inmediatamente.</strong>
      Es posible que le indiquen que deje de tomar sus medicamentos o que vaya
      a la clínica para que le hagan estudios.
    </P>

    <Fold>
      <Heading>
        Llame a su médico o concurra a la guardia de inmediato si tiene:
      </Heading>

      <Bullets>
        <Bullet>Dificultad para respirar.</Bullet>
        <Bullet>Hinchazón de la cara, los labios, la lengua o la garganta</Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        Los efectos secundarios que se indican a continuación se consideran graves.
        Requieren intervención médica
      </Heading>
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
    </Fold>

    <Fold>
      <Heading>
        Los efectos secundarios a continuación se consideran leves.
        No requieren intervención médica.
      </Heading>
      <P>
        Si tiene alguno de estos efectos secundarios, puede seguir tomando sus medicamentos.
      </P>
      <P>
        La rifampicina puede:
      </P>

      <Bullets>
        <Bullet>
          Hacer que la orina, la saliva o las lágrimas tengan una coloración
          naranja. Es posible que el equipo de salud le aconsejen que no use
          lentes de contacto blandos porque pueden mancharse.
        </Bullet>
        <Bullet>
          Aumentar su sensibilidad al sol. Esto significa que debe usar un buen
          filtro solar y cubrir las áreas expuestas para evitar quemaduras.
        </Bullet>
        <Bullet>
          Hacer que las píldoras y los implantes anticonceptivos sean menos
          eficaces. Las mujeres que toman rifampicina deben usar otro método
          anticonceptivo.
        </Bullet>
        <Bullet>
          Si usted está tomando rifampicina y metadona (que se usa para tratar
          las adicciones), es posible que tenga síntomas de abstinencia. Su
          médico o enfermera tal vez tengan que ajustarle la dosis de metadona.
        </Bullet>
      </Bullets>
    </Fold>

    <Fold>
      <Heading>
        Estrategias para reducir los efectos secundarios
        En cuanto a los medicamentos en casos de efectos indeseables:
      </Heading>

      <Bullets>
        <Bullet>
          Cuando hay intolerancia de tipo digestivo como náuseas, vómitos
          pueden utilizarse la metoclopramida (Reliveran gotas), ranitidina u
          omeprazol). Incluso hasta que mejoren los síntomas puede dividirse la
          toma de medicamentos 2 veces por día.
        </Bullet>
        <Bullet>
          Cuando hay reacciones en la piel leves al comienzo del tratamiento,
          pueden tratarse con anthistamínicos (loratadina, difenhidramina)
        </Bullet>
        <Bullet>
          En el caso de artralgias (dolor en las articulaciones) pueden
          utilizarse analgésicos o antinflamatorios. La pirazinamida suele
          causar estas molestias.
        </Bullet>
        <Bullet>
          En los dolores musculares (polineuropatía) se utiliza complejo
          Vitamina B.
        </Bullet>
        <Bullet>
          En Estados febriles hay que tener en cuenta que no sean ocasionados
          por fármacos
        </Bullet>
      </Bullets>
    </Fold>
  </Layout>
))

const Bullet = styled.li`
  margin-top: 0.5rem;
`

const Bullets = styled(List)`
  list-style: inside;
`

const Heading = styled.h3`
  font-weight: 100;
  margin-top: 0;
  margin-bottom: 0;
`

const P = styled(Paragraph)`
  margin-bottom: 1rem;
`

const Title = styled.h1`
  margin-top: 0;
`

SymptomOverview.route = `/info/symptom-overview`
export default SymptomOverview
