import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import Layout from "../layouts/Text"
import { darkgrey } from "../colors"

const Messaging = observer(() => (
  <Layout>
    <HeadText>
      <p>
        Aquí es donde puede conversar con su coordinador de tratamiento
        y ver los mensajes educativos
        que corresponden a su etapa de tratamiento.
      </p>

      <br />

      <p>
        <strong>
        Nota: La mensajería no es para emergencias o problemas médicos urgentes.
        </strong>
        Si tiene una emergencia, haga
        <a href='' style={{textDecoration: 'line-through'}}>
        clic aquí para llamar al 911.
        </a>
      </p>

      <p>
        Las horas de mensajería son de lunes a viernes,
        de 09:00 a 17:00.
        Su coordinador de tratamiento responderá tan pronto como sea posible,
        generalmente dentro de las 24 horas (durante la semana).
      </p>
    </HeadText>

    <Message>
      <Name>Maria Barrientos</Name>
      <Date>Hoy a las 11:53</Date>
      <Text>Maria: Hola Luis! ¿Cómo estás? Recibí tu mensaje sob...</Text>
    </Message>

    <Message>
      <Name>TB Tratamiento Semana 1 Información</Name>
      <Date>Ayer</Date>
      <Text>TB Tratamiento: Felicidades por compluir tu...</Text>
    </Message>

    <Message>
      <Name>TB Tratamiento Semana 1 Información</Name>
      <Date>Ayer</Date>
      <Text>TB Tratamiento: Felicidades por compluir tu...</Text>
    </Message>
  </Layout>
))

const HeadText = styled.div`
`

const Name = styled.div`
`

const Date = styled.div`
  color: ${darkgrey}
`

const Text = styled.div`
`

const Message = styled.div`
  border: 1px solid ${darkgrey};
  margin-bottom: 2rem;
  padding: 1rem;

  & > ${Text} {
    margin-top: 1rem;
  }
`

export default Messaging;
