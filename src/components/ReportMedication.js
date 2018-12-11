import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import moment from "moment"

import Timepicker from "./Timepicker"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <h1>Reporta Medicación</h1>

    <p>
      Tomé el medicamento a las
    </p>

    <Timepicker
      initialValue={store.survey_medication_time}
      onChange={time => store.survey_medication_time = time}
    />

    <p>del {moment().format("YYYY/MM/DD")}.</p>
  </Layout>
))

const Layout = styled.div`
`

export default ReportMedication
