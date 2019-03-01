import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Heading from "../primitives/Heading"
import Button from "../primitives/Button"
import { DateTime } from "luxon"
import Fold from "../primitives/Fold"

import { blue } from "../colors"
import { Icon } from "@mdi/react"
import { mdiCheckCircle } from "@mdi/js"

import ImageCapture from "./ImageCapture"

const PhotoUpload = observer(({ store }) => (
  <Layout>
    <Heading>{store.translate("survey.upload.title")}</Heading>

    <Fold>
      {/* TODO: Translate this */}
      <Title>Instructions</Title>
      <p>{store.translate("survey.upload.instructions.intro")}</p>

      <ul>
        <li>{store.translate("survey.upload.instructions.1")}</li>
        <li>{store.translate("survey.upload.instructions.2")}</li>
        <li>{store.translate("survey.upload.instructions.3")}</li>
        <li>{store.translate("survey.upload.instructions.4")}</li>
        <li>{store.translate("survey.upload.instructions.5")}</li>
        <li>{store.translate("survey.upload.instructions.6")}</li>
      </ul>
    </Fold>

    <div>
      { store.capturing
      ? <ImageCapture
          store={store}
          onCapture={(image) => {
            clearInterval(store.test_strip_timer)
            store.storePhoto(image);
          }}
        >
          {/*TODO remove*/}
        </ImageCapture>
      : <Button onClick={() => store.capturing = true}>
          {/* TODO: Rename start_timer */}
          {store.translate("survey.upload.click_here")}
        </Button>
        }
    </div>

    <ImagePreviews className="ImagePreviews">
      {store.uploadedImages.map(image =>
        <Image key={image}>
          <img src={image} alt={store.translate("survey.upload.finished")} />
          <ConfirmationIcon />
        </Image>
      )}
    </ImagePreviews>
  </Layout>
))

const Layout = styled.div`
  display: grid;
  grid-row-gap: 1rem;
`

const Title = styled.h3`
  font-weight: 100;
  margin: 0;
`

const Image = styled.div`
  height: 4rem;
  overflow: hidden;
  position: relative;

  & img {
    height: 100%;
    width: 100%;
  }
`

const ConfirmationIcon = styled(Icon).attrs({
  color: blue,
  path: mdiCheckCircle,
})`
  position: absolute;
  height: 60%;
  width: 60%;

  left: 20%;
  top: 20%;
  z-index: 1;

  & > path {
    stroke: black;
  }
`

const ImagePreviews = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export default PhotoUpload
