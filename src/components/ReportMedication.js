import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Timepicker from "./Timepicker"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <h1>Reporta Medicación</h1>

    <Timepicker
      value={store.survey.medicationTime}
      onChange={time => store.survey.recordMedicationTime(time)}
    />
  </Layout>
))

const Layout = styled.div`
`

ReportMedication.route = "/report-medication"
export default ReportMedication
