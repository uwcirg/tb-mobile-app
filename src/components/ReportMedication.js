import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import field from "../util/field"
import { Hidden, Provider } from "reakit"
import theme from "reakit-theme-default";
import Heading from "../primitives/Heading"
import Selection from "../primitives/Selection"

const translation_keys =  { true: "yes", false: "no" }

const ReportMedication = observer(({ assembly }) => (
  <Layout>
    <Heading>
      {assembly.translate("survey.took_medication.title")}
      {assembly.survey.date === DateTime.local().setLocale(assembly.locale).toLocaleString()
        ? assembly.translate("survey.took_medication.today")
        : assembly.translate("survey.took_medication.on") + assembly.survey.date + "?"}
    </Heading>

    <Selection
      update={() =>
          assembly.translate(
            `primitives.yes_no.${translation_keys[assembly.survey.took_medication]}`
          )
      }
      options={
        Object.values(translation_keys).map((v) =>
          assembly.translate(`primitives.yes_no.${v}`)
        )
      }
      onChange={(selection) => assembly.survey.took_medication = (
        selection ===
        assembly.translate(`primitives.yes_no.${translation_keys[true]}`)
      )}
    />

    <Provider theme={theme}>
      <div>
        <Hidden visible={assembly.survey.took_medication === false} >
          {field(assembly, "survey.not_taking_medication_reason").label}
          {field(assembly, "survey.not_taking_medication_reason").field}
        </Hidden>

        <Hidden visible={assembly.survey.took_medication} >
          {field(assembly, "survey.medication_time", "time").label}
          {field(assembly, "survey.medication_time", "time").field}
        </Hidden>
      </div>
    </Provider>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

export default ReportMedication
