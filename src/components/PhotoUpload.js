import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import Heading from "../primitives/Heading"
import Button from "../primitives/Button"
import moment from "moment"
import Fold from "../primitives/Fold"

import { blue } from "../colors"
import { Icon } from "@mdi/react"
import { mdiCheckCircle } from "@mdi/js"

import ImageCapture from "./ImageCapture"

const PhotoUpload = observer(({ store }) => (
  <Layout>
    <Heading>{store.translate("survey.upload.title")}</Heading>

    <Fold>
      <div>{store.translate("survey.upload.instructions.intro")}</div>

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
      { store.test_strip_timer_start
      ? <ImageCapture
          store={store}
          onCapture={(image) => {
            clearInterval(store.test_strip_timer)
            store.storePhoto(image);
          }}
        >
          {store.test_strip_time.format("mm:ss")}
        </ImageCapture>
      : <Button onClick={() => store.test_strip_timer_start = moment()}>
          {store.translate("survey.upload.start_timer")}
        </Button>
        }
    </div>


    <ImagePreviews>
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
