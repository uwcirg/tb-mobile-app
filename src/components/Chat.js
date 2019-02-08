import React from "react";
import styled from "styled-components"
import Layout from "../layouts/Text"
import Button from "../primitives/Button"
import { PlusIcon, ContentSaveIcon, SendIcon } from "mdi-react"
import { grey } from "../colors"
import Fold from "../primitives/Fold"
import moment from "moment"

import { observer } from "mobx-react"

// Need to make changes here
const Notes = observer(({store}) => (
  <Layout>
    
    {/* for simplicity sake we are going to have one chat thread */}

    { //store.chat.length === 0
        // we need to display an input box
        // TODO: Map to the database schema, should be able to do
        <div>
            <ChatBox defaultValue="Hello..." type="text" />
        </div>
    }

    {/* { store.notes.length === 0
      ? <Hint>{store.translate("notes.hint")}</Hint>

      : store.notes.map(({ id, title, created_at, text, updated_at }) => (
        <Note key={id}>
          <Note.Header>
            <Note.Title>{title}</Note.Title>
            <Note.Created>{moment(created_at).format("MMM DD, HH:mm")}</Note.Created>
          </Note.Header>

          <Note.Text>{text}</Note.Text>

          <Note.LastUpdated>
            {store.translate("notes.last_edited")}
            {updated_at}
          </Note.LastUpdated>
        </Note>
    ))} */}

    {/* instead of a new button we need a chat box at the bottom */}

  </Layout>
))

const ChatBox = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  height: 80vh;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Input = styled.textarea`
  text-align: left;
  flex-grow: 1;
  border-top: none;
`

const NewButton = styled(Button)`
  float: right;
  margin-bottom: .5rem;
`

const TitleInput = styled.textarea`
  text-align: left;
  flex-grow: 1;
  border-bottom: none;
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
