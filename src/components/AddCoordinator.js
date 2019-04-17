import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { PlusIcon } from "mdi-react"
import { Box, Block, Popover, Input } from "reakit";

import { grey, darkgrey, white, blue } from "../colors"

const AddCoordinator = observer(({ assembly }) => (
  <Popover.Container>
    {popover => (
      <Block>
        <Toggle {...popover} >
          <PlusIcon />
        </Toggle>

        <Pop hideOnClickOutside {...popover}>
          <Popover.Arrow/>

          <Observer>{ () =>
            <Layout>
              <Title>
                {assembly.translate("new_coordinator.title")}
              </Title>

              {field(assembly, "new_coordinator.name").label}
              {field(assembly, "new_coordinator.name").field}

              {field(assembly, "new_coordinator.email").label}
              {field(assembly, "new_coordinator.email").field}

              {field(assembly, "new_coordinator.password").label}
              {field(assembly, "new_coordinator.password").field}

              <Save onClick={() => assembly.add_coordinator()}>
                {assembly.translate("new_coordinator.save")}
              </Save>
            </Layout>
          }</Observer>
        </Pop>
      </Block>
    )}
  </Popover.Container>
))

const Layout = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 1rem;
`

const Pop = styled(Popover)`
  border: 1px solid ${darkgrey};
  padding: 1rem;
  background-color: ${white};
`

const Toggle = styled(Popover.Toggle)`
  background-color: ${white};
  color: ${darkgrey};
`

const Title = styled.h3`
  grid-column: 2;
`

const Save = styled(Button)`
  background-color: ${blue};
  width: 100%;
  grid-column: 2;
`

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`

const Field = styled(Input)`
  background-color: ${white}
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  border: 1px solid ${grey};
`

const field = (assembly, tag) => ({
  label:
    <label htmlFor={tag}>
      {assembly.translate(tag)}
    </label>
  ,

  field:
    <Field
      name={tag}
      value={assembly.fetch(tag)}
      onChange={(e) => {
        assembly.set(tag, e.target.value)
      }}
    />
  ,
})

export default AddCoordinator
