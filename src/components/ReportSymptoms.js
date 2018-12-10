import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Hidden, Input } from "reakit"
import { white } from "../colors"
import Button from "../primitives/Button"

const ReportSymptoms = observer(({ survey }) => (
  <Layout>
    <h1>Reporta Sintomas</h1>

    <Hidden.Container>
      { hidden =>
        <div>
          <p>Have you experienced any symptoms or side effects?</p>

          <Choice>
            <Button as={Hidden.Show} {...hidden} >Yes</Button>
            <Button as={Hidden.Hide} {...hidden} >No</Button>
          </Choice>

          <Hidden {...hidden}>
            <p>Which symptoms?</p>

            <Label><Checkbox /><span>Náuseas o vómitos</span></Label>
            <Label><Checkbox /><span>Enrojectimiento de la piel, granitos, picazón</span></Label>
            <Label><Checkbox /><span>Urticaria</span></Label>
            <Label><Checkbox /><span>Fiebre</span></Label>
            <Label><Checkbox /><span>Pérdida de apetito</span></Label>
            <Label><Checkbox /><span>Visión borrosa o cambios en la forma de ver los colores</span></Label>
            <Label><Checkbox /><span>La barriga se siente sensible o dolorido</span></Label>
            <Label><Checkbox /><span>Coloración amarillenta en la piel o en la parte blanca de los ojos</span></Label>
            <Label><Checkbox /><span>Dificultad para respirar</span></Label>
            <Label><Checkbox /><span>Hinchazón de la cara, los labios, la lengua, o la garganta</span></Label>

            <Label>
              <span>Otra síntoma:</span>
              <TextInput />
            </Label>
          </Hidden>
        </div>
      }
    </Hidden.Container>
  </Layout>
))

const Layout = styled.div`
`

const Choice = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`

const Label = styled.label`
  display: grid;
  grid-template-columns: 5rem auto;
  padding-bottom: 0.5rem;
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
