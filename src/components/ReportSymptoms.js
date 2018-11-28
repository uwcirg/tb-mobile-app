import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Input } from "reakit";
import { white } from "../colors";

const ReportSymptoms = observer(({ survey }) => (
  <Layout>
    <h1>Reporta Sintomas</h1>

    <Label>
      <Checkbox /><span>Náuseas o vómitos</span>
      <Checkbox /><span>Enrojectimiento de la piel, granitos, picazón</span>
      <Checkbox /><span>Urticaria</span>
      <Checkbox /><span>Fiebre</span>
      <Checkbox /><span>Pérdida de apetito</span>
      <Checkbox /><span>Visión borrosa o cambios en la forma de ver los colores</span>
      <Checkbox /><span>La barriga se siente sensible o dolorido</span>
      <Checkbox /><span>Coloración amarillenta en la piel o en la parte blanca de los ojos</span>
      <Checkbox /><span>Dificultad para respirar</span>
      <Checkbox /><span>Hinchazón de la cara, los labios, la lengua, o la garganta</span>

      <span>Otra síntoma:</span>
      <TextInput />
    </Label>
  </Layout>
))

const Layout = styled.div`
`

const Label = styled.label`
  display: grid;
  grid-template-columns: 5rem auto;
  grid-row-gap: 0.5rem;
`

const TextInput = styled(Input)`
  background-color: ${white};
`

const Checkbox = styled(Input).attrs({
  type: "checkbox",
})`
  height: 1rem;
`

ReportSymptoms.title = "Report Symptoms"
export default ReportSymptoms
