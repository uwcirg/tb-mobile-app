import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import { Image, Popover } from "reakit";
import Callout from "./Callout"

const PhotoPopout = observer(({ children, src }) => (
  <Popover.Container>
    {state => (
      <HelpToggle>
        <Preview as={Image} {...state} src={src} />

        <Callout {...state}>
          <Image
            src={src}
            alt={"Strip report"}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          />

          {children}
        </Callout>
      </HelpToggle>
    )}
  </Popover.Container>
))

const HelpToggle = styled.div`
  width: 2rem;
  flex-basis: 2rem;
  color:blue;
  text-decoration:underline;
`

const Preview = styled(Popover.Toggle).attrs({
  alt: "Strip report",
})`
max-height: 4rem;
`

export default PhotoPopout
