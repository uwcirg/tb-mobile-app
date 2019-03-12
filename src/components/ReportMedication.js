import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Hidden, Input, Provider } from "reakit"
import theme from "reakit-theme-default";

import { grey, white } from "../colors"
import Heading from "../primitives/Heading"
import Selection from "../primitives/Selection"

const translation_keys =  { true: "yes", false: "no" }

const ReportMedication = observer(({ store }) => (
  <Layout>
    <Heading>{store.translate("survey.tookMedication.title")}</Heading>

    <Selection
      update={() =>
          store.translate(
            `primitives.yes_no.${translation_keys[store.survey_tookMedication]}`
          )
      }
      options={
        Object.values(translation_keys).map((v) =>
          store.translate(`primitives.yes_no.${v}`)
        )
      }
      onChange={(selection) => store.survey_tookMedication = (
        selection ===
        store.translate(`primitives.yes_no.${translation_keys[true]}`)
      )}
    />

    <Provider theme={theme}>
      <div>
        <Hidden visible={store.survey_tookMedication === false} >
          <TextFieldLabel>
            <span>{store.translate("survey.tookMedication.reason")}</span>

            <TextInput 
              use="textarea" 
              value={store.survey_notTakingMedicationReason || ""}
              onChange={(e) => store.survey_notTakingMedicationReason = e.target.value}
            />
          </TextFieldLabel>
        </Hidden>

        <Hidden visible={store.survey_tookMedication === true} >
          <p>{store.translate("survey.tookMedication.at")}</p>

          <TextInput
            type="date"
            value={store.survey_date}
            onChange={(e) => store.survey_date = e.target.value}
          />

          <TextInput
            type="time"
            value={store.survey_medication_time}
            onChange={(e) => store.survey_medication_time = e.target.value}
          />
        </Hidden>
      </div>
    </Provider>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const Label = styled.label`
  display: grid;
  grid-template-columns: 2rem auto 2rem;
  padding-bottom: 0.5rem;
`

const TextFieldLabel = styled(Label)`
  grid-template-columns: 6rem auto;
  margin-top: 1rem;
  grid-column-gap: 1rem;
`

const TextInput = styled(Input)`
  background-color: ${white};
  border: 1px solid ${grey};
`

export default ReportMedication
