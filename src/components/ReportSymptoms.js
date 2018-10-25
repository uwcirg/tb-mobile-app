import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Input } from "reakit";
import { white } from "../colors";

const ReportSymptoms = observer(({ survey }) => (
  <Layout>
    <h1>Reporta Sintomas</h1>

    <Label>
      <Input type="checkbox" /><span>Náuseas o vómitos</span>
      <Input type="checkbox" /><span>Enrojectimiento de la piel, granitos, picazón</span>
      <Input type="checkbox" /><span>Urticaria</span>
      <Input type="checkbox" /><span>Fiebre</span>
      <Input type="checkbox" /><span>Pérdida de apetito</span>
      <Input type="checkbox" /><span>Visión borrosa o cambios en la forma de ver los colores</span>
      <Input type="checkbox" /><span>La barriga se siente sensible o dolorido</span>
      <Input type="checkbox" /><span>Coloración amarillenta en la piel o en la parte blanca de los ojos</span>
      <Input type="checkbox" /><span>Dificultad para respirar</span>
      <Input type="checkbox" /><span>Hinchazón de la cara, los labios, la lengua, o la garganta</span>

      <span>Otra síntoma:</span>
      <TextInput />
    </Label>
  </Layout>
))

const Layout = styled.div`
`

const Label = styled.label`
  display: grid;
  grid-template-columns: auto auto;
`

const TextInput = styled(Input)`
  background-color: ${white};
`

ReportSymptoms.route = "/report-symptoms"
export default ReportSymptoms
