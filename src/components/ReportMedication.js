import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Heading from "../primitives/Heading"
import DateTime from "../primitives/DateTime"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <Heading>{store.translate("survey.medication.title")}</Heading>

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
