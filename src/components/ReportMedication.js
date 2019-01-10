import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const ReportMedication = observer(({ store }) => (
  <Layout>
    <h1>{store.translate("survey.medication.title")}</h1>
  </Layout>
))

const Layout = styled.div`
`

export default ReportMedication
