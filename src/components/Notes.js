import React from "react";
import styled from "styled-components"
import { PlusIcon, ContentSaveIcon } from "mdi-react"
import { grey } from "../colors"
import Fold from "../primitives/Fold"
import { observer } from "mobx-react"
import { DateTime } from "luxon"
import theme from "reakit-theme-default";
import { Button, Provider, Input } from "reakit";
import { primary, green } from "../colors"

const Notes = observer(({ assembly }) => (

  <Provider theme={theme}>
    <div>
      <h2>
        {assembly.currentPageTitle}
      </h2>
      
      { assembly.noteDraft === null && assembly.noteTitle === null

      ? <Button onClick={() => assembly.composeNote()} backgroundColor={primary}>
          <PlusIcon/> {assembly.translate("notes.new")}
        </Button>

      : <div>
          <Input
            placeholder={assembly.translate("notes.title")}
            value={assembly.noteTitle}
            onChange={e => assembly.noteTitle = e.target.value}
          />
          
          <Padding></Padding>

          <Input
            placeholder={assembly.translate("notes.body")}
            value={assembly.noteDraft}
            onChange={e => assembly.noteDraft = e.target.value}
            as="textarea"
          />

          <SaveButton onClick={() => assembly.saveNote()}>
            <ContentSaveIcon/> {assembly.translate("notes.save")}
          </SaveButton>
        </div>
      }

      { (
        assembly
          .participant_account
          .information
          .notes
        || []
        )
        .length === 0

      ? <Hint>{assembly.translate("notes.hint")}</Hint>

      : assembly
        .participant_account
        .information
        .notes
        .map(({ id, title, created_at, text }) => (
          <Note key={id}>
            <Note.Header>
              <Note.Title>{title}</Note.Title>
              <Note.Created>
                {DateTime
                  .fromISO(created_at)
                  .setLocale(assembly.locale)
                  .toLocaleString(DateTime.DATETIME_SHORT)}
              </Note.Created>
            </Note.Header>

            <Note.Text>{text}</Note.Text>

          </Note>
      ))}
    </div>
  </Provider>
))

const SaveButton = styled(Button)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: ${green};
`

const Padding = styled.div`
  padding: 0.25rem;
`

const Hint = styled.div`
  color: darkgrey;
  overflow: hidden;
  padding-top: 0.5rem;
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
