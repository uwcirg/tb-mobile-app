import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Hidden, Input } from "reakit"
import { grey, white } from "../colors"
import Button from "../primitives/Button"
import Selection from "../primitives/Selection"

const translations =  { true: "Sí", false: "No" }

const ReportSymptoms = observer(({ store, survey }) => (
  <Layout>
    <h1>{store.translate("survey.symptoms.title")}</h1>

    <p>{store.translate("survey.symptoms.since_last")}</p>

    <Selection
      update={() => translations[store.survey_anySymptoms]}
      options={["Sí", "No"]}
      onChange={(selection) => store.survey_anySymptoms = (selection == translations[true])}
    />

    <Hidden visible={store.survey_anySymptoms} >
      <p>{store.translate("survey.symptoms.prompt")}</p>

      <Label><Checkbox /><span>{store.translate("survey.symptoms.nausea")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.redness")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.hives")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.fever")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.appetite_loss")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.blurred_vision")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.upset_stomach")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.yellow_coloration")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.difficulty_breathing")}</span></Label>
      <Label><Checkbox /><span>{store.translate("survey.symptoms.facial_swelling")}</span></Label>

      <Label>
        <span>{store.translate("survey.symptoms.other")}:</span>
        <TextInput />
      </Label>
    </Hidden>
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
  border: 1px solid ${grey};
`

const Checkbox = styled(Input).attrs({
  type: "checkbox",
})`
  height: 1rem;
`

export default ReportSymptoms
