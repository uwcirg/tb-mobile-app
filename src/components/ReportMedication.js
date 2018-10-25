import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const ReportMedication = observer(({ survey }) => (
  <Layout>
    <h1>Reporta Medicación</h1>
  </Layout>
))

const Layout = styled.div`
`

ReportMedication.route = "/report-medication"
export default ReportMedication
