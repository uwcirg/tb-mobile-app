import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { white, primary, black } from "../colors"
import InternalLink from "../primitives/InternalLink"

import Icon from "@mdi/react"
import {
  mdiWhatsapp,
  mdiFolderClockOutline,
  mdiInformationOutline,
  mdiPencilBoxOutline,
  mdiHome,
  mdiAlertDecagram,
} from "@mdi/js"

import Home from "./Home"
import InfoEd from "./InfoEd"
import Notes from "./Notes"
import Contact from "./Contact"
import Progress from "./Progress"

const PopUp = () => {
  return(
  <PopUpIcon>      
  <Icon
  path={mdiAlertDecagram}
  color={"red"}
  size="1.5em"/>
  </PopUpIcon>
  )}


const Navigation = observer(({ assembly }) => (
  <Layout>
    <InternalLink to={Home} assembly={assembly} >
      <Icon
        path={mdiHome}
        color={assembly.currentPage === Home ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={Progress} assembly={assembly} >
      <Icon
        path={mdiFolderClockOutline}
        color={assembly.currentPage === Progress ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <InternalLink to={Contact} assembly={assembly} >
      <NotificationContainer>
      <Icon
        path={mdiWhatsapp}
        color={assembly.currentPage === Contact ? primary : black}
        size="1.8rem"
      />
      {localStorage.getItem('visitedDiscussion') ? "" : <PopUp />}
      </NotificationContainer>

    </InternalLink>

    <InternalLink to={Notes} assembly={assembly} >
      <Icon
        path={mdiPencilBoxOutline}
        color={assembly.currentPage === Notes ? primary : black}
        size="1.8rem"
      />
    </InternalLink>

    <IconContainer>
    <InternalLink to={InfoEd} assembly={assembly} >
      <Icon
        path={mdiInformationOutline}
        color={assembly.currentPage === InfoEd ? primary : black}
        size="1.8rem"
      />       
    </InternalLink>
    </IconContainer>
  </Layout>
))

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${white};
  padding: 1rem;
  a:link {
    text-decoration: none;
  }
  
  a:visited {
    text-decoration: none;
  }
`

const IconContainer = styled.div`


`

const PopUpIcon = styled.div`
position: absolute;
  top: -10px;
  right: -10px;
/*
  width: 20px;
  height: 20px;
  padding: 1px;
  border-radius: 5px;
  background-color: red;
  z-index: 1000;

  color: white;
  text-align: center;
  */

`
const NotificationContainer = styled.div`
position: relative;`

export default Navigation;
