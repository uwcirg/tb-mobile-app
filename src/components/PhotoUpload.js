import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import DropZone from "react-dropzone"

import {
  mdiCheckCircle,
  mdiImage,
} from "@mdi/js"
import { Icon } from "@mdi/react"
import { green, lightgrey } from "../colors"

const PhotoUpload = observer(({ store }) => (
  <div>
    <h1>Carga la Foto</h1>

    <DropZone
      accept={["image/jpeg", "image/png"]}
      onDrop={(acceptedFiles, rejectedFiles) => {
        console.log(rejectedFiles)
        acceptedFiles.forEach(file => store.storePhoto(file))
      } }
    >
      <Instructions>
        <p>Haga clic aquí para subir una foto.</p>
        <Icon size="2rem" color={lightgrey} path={mdiImage} />
      </Instructions>
    </DropZone>

    <ImagePreviews>
      {store.uploadedImages.map(image =>
        <Image key={image}>
          <img src={image} />
          <ConfirmationIcon />
        </Image>
      )}
    </ImagePreviews>
  </div>
))

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

const Instructions = styled.div`
  padding: 1rem;
  color: ${lightgrey};
  font-size: 1.2rem;
  text-align: center;
`

const ImagePreviews = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

PhotoUpload.title = "Upload Photo"
export default PhotoUpload
