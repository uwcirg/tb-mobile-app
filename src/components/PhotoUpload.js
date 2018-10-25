import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

const PhotoUpload = observer(({ survey }) => (
  <h1>Carga la Foto</h1>
))

PhotoUpload.route = "/photo-upload"
export default PhotoUpload
