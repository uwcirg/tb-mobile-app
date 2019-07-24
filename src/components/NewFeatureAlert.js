import React from "react"
import styled from "styled-components"
import {green} from "../colors"

import Icon from "@mdi/react"
import {
  mdiWhatsapp
} from "@mdi/js"


const NewFeatureAlert = () => (
  <Layout>
      <span>
      Estimados pacientes hemos agregado una nueva función, un Foro de discusión.
        <br></br>
        <br></br>
        ¡Pruebe la nueva función del foro de discusión! Haga clic en el icono de <Icon path={mdiWhatsapp} color={"white"} size="1em"/>
      </span>
  </Layout>
)

const Layout = styled.div`
  background-color: ${green}
  border-radius: 5px;
  padding: 1em;
  color: white;
  width: 90%;
  margin: auto;
`

export default NewFeatureAlert
