import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Button } from "reakit"
import moment from "moment"

import Timepicker from "./Timepicker"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <h1>Reporta Medicación</h1>

    <p>
      Tomé el medicamento a las
    </p>

    <Timepicker
      initialValue={store.survey.medicationTime}
      onChange={time => store.survey.recordMedicationTime(time)}
    />

    <p>del {store.survey.date.format("YYYY/MM/DD")}.</p>
  </Layout>
))

const Layout = styled.div`
`

ReportMedication.title = "Report Medication"
export default ReportMedication
