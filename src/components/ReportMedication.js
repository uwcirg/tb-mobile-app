import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Hidden, Input } from "reakit"

import { grey, white } from "../colors"
import Heading from "../primitives/Heading"
import DateTime from "../primitives/DateTime"
import Selection from "../primitives/Selection"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <Heading>{store.translate("survey.tookMedication.title")}</Heading>


    <Selection
      update={() => store.survey_tookMedication
        ? store.translate("survey.tookMedication.yes")
        : store.translate("survey.tookMedication.no")
      }
      options={[
        store.translate("survey.tookMedication.yes"),
        store.translate("survey.tookMedication.no"),
      ]}
      onChange={(selection) => store.survey_tookMedication = (
        selection === store.translate("survey.tookMedication.yes")
      )}
    />

    <Hidden visible={!store.survey_tookMedication} >
      <TextFieldLabel>
        <span>{store.translate("survey.tookMedication.reason")}</span>
        <TextInput />
      </TextFieldLabel>
    </Hidden>

    <Hidden visible={store.survey_tookMedication} >
      <p>{store.translate("survey.tookMedication.at")}</p>

      <DateTime
        store={store}
        date_path="survey_date"
        time_path="survey_medication_time"
      />
    </Hidden>
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
