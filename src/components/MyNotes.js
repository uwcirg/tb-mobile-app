import React from "react";
import styled from "styled-components"
import { observer } from "mobx-react"

import { ArrowRightIcon } from "mdi-react"

const MyNotes = observer(() => (
  <NotesMain>
    <Heading>
      <ArrowRightIcon />
      Sobre "Mis Notas"
    </Heading>

    <Input
      placeholder='Aquí puede escribir sus notas...'
    />
  </NotesMain>
))

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
