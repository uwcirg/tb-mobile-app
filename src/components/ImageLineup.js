import React from "react"
import styled from "styled-components"
import { Image } from "reakit"
import { observer } from "mobx-react"

const ImageLineup = observer(({ store, images, alts, onSelect }) => (
  <Layout>
    { Object.keys(images).map((value) => (
      <div>
        <Image
          src={images[value]}
          alt={alts[value]}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onSelect(value)
          }}
          width="60px"
        />
      </div>
    ))}
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
`

export default ImageLineup
