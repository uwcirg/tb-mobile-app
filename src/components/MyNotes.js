import React from "react";
import styled from "styled-components"

import BottomNav from "./BottomNav";
import { ArrowRightIcon } from "mdi-react"
import TopBar from "./TopBar";

const MyNotes = () => (
  <div>
    <TopBar header='Mis Notas' expand />

    <NotesMain>
        <Heading>
          <ArrowRightIcon />
          Sobre "Mis Notas"
        </Heading>

        <Input
          placeholder='Aquí puede escribir sus notas...'
        />
      </NotesMain>

    <BottomNav />
  </div>
)

const NotesMain = styled.div`
  height: 78vh;
  padding: 2vh 1vh;
`

const Heading = styled.h3`
  height: 6vh;
`

const Input = styled.textarea`
  height: 68vh;
  text-align: left;
`

export default MyNotes;
