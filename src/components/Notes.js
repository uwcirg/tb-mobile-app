import React from "react";
import styled from "styled-components"
import Layout from "../layouts/Text"
import Button from "../primitives/Button"
import { PlusIcon, ContentSaveIcon } from "mdi-react"
import { grey } from "../colors"
import Fold from "../components/Fold"
import moment from "moment"

import { observer } from "mobx-react"

const Notes = observer(({store}) => (
  <Layout>
    { store.noteDraft === null && store.noteTitle === null
    ? <NewButton onClick={() => store.composeNote()}>
        <PlusIcon/> Nueva
      </NewButton>

    : <Draft>
        <TitleInput
          placeholder='Titula'
          value={store.noteTitle}
          onChange={e => store.noteTitle = e.target.value}
        />
        <Input
          placeholder='Escribe sus notas aquí...'
          value={store.noteDraft}
          onChange={e => store.noteDraft = e.target.value}
        />
        <NewButton onClick={() => store.saveNote()}>
          <ContentSaveIcon/> Save
        </NewButton>
      </Draft>
    }

    {store.notes.length === 0
    ? <Hint>Graba notas privadas aquí.</Hint>
    : store.notes.map(({ id, title, created_at, text, updated_at }) => (
      <Note key={id}>
        <Note.Header>
          {/* TODO change this to `title` */}
          <Note.Title>{title}</Note.Title>
          <Note.Created>{moment(created_at).format("MMM DD, HH:mm")}</Note.Created>
        </Note.Header>

        <Note.Text>{text}</Note.Text>
        <Note.LastUpdated>Last edited {updated_at}</Note.LastUpdated>
      </Note>
    ))}
  </Layout>
))

const NewButton = styled(Button)`
  float: right;
`

const TitleInput = styled.textarea`
  text-align: left;
  flex-grow: 1;
  border-bottom: none;
`

const Input = styled.textarea`
  text-align: left;
  flex-grow: 1;
  border-top: none;
`

const Draft = styled.div`
  display: grid;

  grid-template-columns: 1fr auto;
  grid-template-rows: 2rem 4rem;
  overflow: hidden;
  margin-bottom: 1rem;

  & > ${TitleInput} {
    grid-area: 1 / 1 / 2 / 2;
  }

  & > ${Input} {
    grid-area: 2 / 1 / -1 / 2;
  }

  & > ${NewButton} {
    grid-area: 1 / 2 / -1 / -1;
  }
`

const Hint = styled.div`
  color: darkgrey;
  overflow: hidden;
  height: 2rem;
`

const Note = styled(Fold)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

Note.Text = styled.div`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
`
Note.Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 50%;
`
Note.Title = styled.div`
  font-weight: bold;
`
Note.LastUpdated = styled.div`
  color: ${grey};
  text-align: right;
`
Note.Created = styled.div`
  color: ${grey};
`

Notes.route = "/notes"
export default Notes;
