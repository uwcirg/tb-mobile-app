import React from "react"
import styled from "styled-components"
import { Grid, Hidden } from "reakit"
import { observer } from "mobx-react"
import { ChevronDownIcon } from "mdi-react"

const Fold = observer(({ children }) => (
  <Hidden.Container>
    {hidden => (
      <Layout as={Hidden.Toggle} {...hidden}>
        {children[0]}

        <ExpandIcon {...hidden} >
          <ChevronDownIcon />
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
    )}
  </Hidden.Container>
))

const ExpandIcon = styled.div`
  transform: rotateZ(${p => p.visible ? "-180deg" : "0deg"});
  transition: transform 250ms;
`

const Layout = styled(Grid)`
  align-items: baseline;
  border: 1px solid grey;
  grid-template-columns: 1fr auto;
  overflow: hidden;
  padding: 1rem;
  text-align: left;
  width: 100%;
`

const Slider = styled.div`
  overflow: hidden;
  grid-columns: 1 -1;
`

export default Fold
