import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import DateTime from "../primitives/DateTime"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <h1>{store.translate("survey.medication.title")}</h1>

    <DateTime
      store={store}
      date_path="survey_date"
      time_path="survey_medication_time"
    />
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

export default ReportMedication
