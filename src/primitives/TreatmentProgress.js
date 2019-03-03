import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import CircularProgressbar from "react-circular-progressbar"
import { primary } from "../colors"

const TreatmentProgress = observer(({ children }) => (
    <Layout>
      <Progressbar
        percentage={68}
        styles={{ path: { stroke: primary } }}
      />

      <ChildWrapper>
        {children}
      </ChildWrapper>
    </Layout>
))

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ChildWrapper = styled.div`
  position: absolute;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Progressbar = styled(CircularProgressbar)`
  position: absolute;
`

export default TreatmentProgress
