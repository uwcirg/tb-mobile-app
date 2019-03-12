import React from "react";
import styled from "styled-components"
import Button from "../primitives/Button"
import { PlusIcon, ContentSaveIcon } from "mdi-react"
import { grey } from "../colors"
import Fold from "../primitives/Fold"
import { observer } from "mobx-react"
import { DateTime } from "luxon"

const Notes = observer(({ assembly }) => (
  <Layout>
    <h2>{assembly.currentPageTitle}</h2>
    { assembly.noteDraft === null && assembly.noteTitle === null
    ? <NewButton onClick={() => assembly.composeNote()}>
        <PlusIcon/>
        {assembly.translate("notes.new")}
      </NewButton>

    : <Draft>
        <TitleInput
          placeholder={assembly.translate("notes.title")}
          value={assembly.noteTitle}
          onChange={e => assembly.noteTitle = e.target.value}
        />
        <Input
          placeholder={assembly.translate("notes.body")}
          value={assembly.noteDraft}
          onChange={e => assembly.noteDraft = e.target.value}
        />

        <NewButton onClick={() => assembly.saveNote()}>
          <ContentSaveIcon/> Save
        </NewButton>
      </Draft>
    }

    { assembly.registration.information.notes.length === 0
      ? <Hint>{assembly.translate("notes.hint")}</Hint>

      : assembly.registration.information.notes.map(({ id, title, created_at, text, updated_at }) => (
        <Note key={id}>
          <Note.Header>
            <Note.Title>{title}</Note.Title>
            <Note.Created>{DateTime.fromISO(created_at).toLocaleString(DateTime.DATETIME_SHORT)}</Note.Created>
          </Note.Header>

          <Note.Text>{text}</Note.Text>

          <Note.LastUpdated>
            {assembly.translate("notes.last_edited")}
            {DateTime.fromISO(updated_at).toLocaleString(DateTime.DATETIME_SHORT)}
          </Note.LastUpdated>
        </Note>
    ))}
  </Layout>
))

const Layout = styled.div`
  margin: auto;
  max-width: 40em;
  overflow: hidden;
`

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
