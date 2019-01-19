import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Hidden, Input } from "reakit"
import { grey, white } from "../colors"
import Button from "../primitives/Button"
import Selection from "../primitives/Selection"

import DateTime from "../primitives/DateTime"

const translations =  { true: "Sí", false: "No" }

const ReportSymptoms = observer(({ store, survey }) => (
  <Layout>
    <h1>{store.translate("survey.symptoms.title")}</h1>

    <p>{store.translate("survey.symptoms.since_last")}</p>

    <DateTime
      store={store}
      date_path="survey_date"
      time_path="survey_medication_time"
    />

    <Selection
      update={() => translations[store.survey_anySymptoms]}
      options={["Sí", "No"]}
      onChange={(selection) => store.survey_anySymptoms = (selection == translations[true])}
    />

    <Hidden visible={store.survey_anySymptoms} >
      <p>{store.translate("survey.symptoms.prompt")}</p>

      <Label>
        <Checkbox checked={store.nausea} onChange={(e) => store.nausea = e.target.checked } />
        <span>{store.translate("survey.symptoms.nausea")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.redness} onChange={(e) => store.redness = e.target.checked} />
        <span>{store.translate("survey.symptoms.redness")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.hives} onChange={(e) => store.hives = e.target.checked} />
        <span>{store.translate("survey.symptoms.hives")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.fever} onChange={(e) => store.fever = e.target.checked} />
        <span>{store.translate("survey.symptoms.fever")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.appetite_loss} onChange={(e) => store.appetite_loss = e.target.checked} />
        <span>{store.translate("survey.symptoms.appetite_loss")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.blurred_vision} onChange={(e) => store.blurred_vision = e.target.checked} />
        <span>{store.translate("survey.symptoms.blurred_vision")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.sore_belly} onChange={(e) => store.sore_belly = e.target.checked} />
        <span>{store.translate("survey.symptoms.upset_stomach")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.yellow_coloration} onChange={(e) => store.yellow_coloration = e.target.checked} />
        <span>{store.translate("survey.symptoms.yellow_coloration")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.difficulty_breathing} onChange={(e) => store.difficulty_breathing = e.target.checked} />
        <span>{store.translate("survey.symptoms.difficulty_breathing")}</span>
      </Label>

      <Label>
        <Checkbox checked={store.facial_swelling} onChange={(e) => store.facial_swelling = e.target.checked} />
        <span>{store.translate("survey.symptoms.facial_swelling")}</span>
      </Label>

      <TextFieldLabel>
        <span>{store.translate("survey.symptoms.other")}:</span>
        <TextInput />
      </TextFieldLabel>
    </Hidden>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const Choice = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`

const Label = styled.label`
  display: grid;
  grid-template-columns: 2rem auto;
  padding-bottom: 0.5rem;
`

const TextFieldLabel = styled(Label)`
  grid-template-columns: 5rem auto;
  margin-top: 1rem;
`

const TextInput = styled(Input)`
  background-color: ${white};
  border: 1px solid ${grey};
`

const Checkbox = styled(Input).attrs({ type: "checkbox" })`
  height: 1rem;
`

export default ReportSymptoms
