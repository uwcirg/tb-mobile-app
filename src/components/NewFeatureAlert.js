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
        A new messageboard feature has been added. 
        <br></br>
        Check it out by clicking the <Icon path={mdiWhatsapp} color={"white"} size="1.5em"/>
      </span>
  </Layout>
)

const Layout = styled.div`
  background-color: ${green}
  border-radius: 5px;
  padding: 1em;
  color: white;
  width: 80%;
  margin: auto;
`

export default NewFeatureAlert
