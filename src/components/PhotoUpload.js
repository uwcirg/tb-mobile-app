import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Heading from "../primitives/Heading"
import Button from "../primitives/Button"
import Fold from "../primitives/Fold"

import { green } from "../colors"
import { Icon } from "@mdi/react"
import { mdiCheckCircle } from "@mdi/js"

import ImageCapture from "./ImageCapture"

const PhotoUpload = observer(({ assembly }) => (
  <Layout>
    <Heading>{assembly.translate("survey.upload.title")}</Heading>

    <Fold>
      <Title>{assembly.translate("survey.upload.instructions.heading")}</Title>
      <p>{assembly.translate("survey.upload.instructions.intro")}</p>

      <ul>
        <li>{assembly.translate("survey.upload.instructions.1")}</li>
        <li>{assembly.translate("survey.upload.instructions.2")}</li>
        <li>{assembly.translate("survey.upload.instructions.3")}</li>
        <li>{assembly.translate("survey.upload.instructions.4")}</li>
        <li>{assembly.translate("survey.upload.instructions.5")}</li>
        <li>{assembly.translate("survey.upload.instructions.6")}</li>
      </ul>
    </Fold>

    <div>
      { assembly.capturing
      ? <ImageCapture
          assembly={assembly}
          onCapture={(image) => assembly.storePhoto(image) }
        />
      : <Button onClick={() => assembly.capturing = true}>
          {assembly.translate("survey.upload.click_here")}
        </Button>
        }
    </div>

    <ImagePreviews className="ImagePreviews">
      {Object.keys(assembly.photos_uploaded).map(photo_id =>
        <Image key={assembly.photos_uploaded[photo_id].photo}>
          <img
            src={assembly.photos_uploaded[photo_id].photo}
            alt={assembly.translate("survey.upload.finished")}
          />

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
  color: green,
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
