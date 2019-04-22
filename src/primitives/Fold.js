import React from "react"
import styled from "styled-components"
import { Hidden } from "reakit"
import { observer } from "mobx-react"
import { Icon } from "@mdi/react"
import { mdiChevronDown } from "@mdi/js"
import { white } from "../colors"

const Fold = observer(({ children }) => (
  <Hidden.Container>
    {hidden => (
      <Hidden.Toggle {...hidden} width="100%">
        <Layout>
          {children[0]}

          <ExpandIcon {...hidden} >
            <Icon path={mdiChevronDown} size={1} />
          </ExpandIcon>

          <Slider>
            <Hidden fade slide="bottom" {...hidden}>
              { hidden.visible
                ? children.slice(1, children.length)
                : null
              }
            </Hidden>
          </Slider>
        </Layout>
      </Hidden.Toggle>
    )}
  </Hidden.Container>
))

const ExpandIcon = styled.div`
  transform: rotateZ(${p => p.visible ? "-180deg" : "0deg"});
  transition: transform 500ms;
  width: 2rem;
`

const Layout = styled.div`
  align-items: baseline;
  border: 1px solid grey;
  overflow: hidden;
  padding: 0.5rem;
  text-align: left;
  width: initial;
  background-color: ${white};

  display: grid;
  grid-template-columns: 1fr auto;
`

const Slider = styled.div`
  overflow: hidden;
  grid-columns: 1 -1;
  margin-top: 0.5rem;
`

export default Fold
