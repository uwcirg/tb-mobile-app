import React from "react"
import styled from "styled-components"
import Button from "../primitives/Button"
import { observer, Observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiPlus } from "@mdi/js"
import { Box, Block, Popover } from "reakit";
import { darkgrey, white, blue } from "../colors"
import field from "../util/field"

const AddCoordinator = observer(({ assembly }) => (
  <Pop.Container>
    {popover => (
      <Block>
        <Toggle {...popover} >
          <Icon path={mdiPlus} size={1} />
        </Toggle>

        <Pop hideOnClickOutside {...popover}>
          <Pop.Arrow/>

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
  </Pop.Container>
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

export default AddCoordinator
