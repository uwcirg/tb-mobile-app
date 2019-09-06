import React from "react"
import styled from "styled-components"
import { observer,inject } from "mobx-react"

import CircularProgressbar from "react-circular-progressbar"
import { primary } from "../colors"
import days_of_treatment from "../util/days_of_treatment"

const TreatmentProgress = inject("participantStore")(observer(({participantStore, children, assembly }) => (
    <Layout>
      <Progressbar        
        percentage={days_of_treatment(participantStore.information) / 180 * 100}
        styles={{ path: { stroke: primary } }}
      />

      <ChildWrapper>
        {children}
      </ChildWrapper>
    </Layout>
)))

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
