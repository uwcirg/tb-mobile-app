import React from "react"
import styled from "styled-components"

import TopBar from "./TopBar"
import BottomNav from "./BottomNav"

import { ClockIcon } from "mdi-react"

const MyProgress = () => (
  <div>
    <TopBar header="Mi Progreso" />

    <Clock>
      <Face>
        <ClockIcon />
      </Face>

      <Message>
        <strong>¡Sólo quedan 3 meses y 4 días!</strong>

        <p>
          Eso significa que ya ha completado [2 meses, 26 días].
          ¡Estás en camino!
        </p>
      </Message>
    </Clock>

    <History>
      <h3>Historia</h3>
    </History>

    <BottomNav />
  </div>
)

const Clock = styled.div`
  height: 18vh;
  overflow: hidden;
  width: 100%;
`

const Face = styled.div`
  display: inline-block;
  width: 33%;
  height: 18vh;
  font-size: 12vh;
  line-height: 12vh;
  text-align: center;
  padding-top: 2vh;
`

const Message = styled.div`
  display: inline-block;
  width: 66%;
  font-size: 12pt;
`

const History = styled.div`
  padding: 1vh 2vh;
  font-size: 15pt;
`

export default MyProgress;
