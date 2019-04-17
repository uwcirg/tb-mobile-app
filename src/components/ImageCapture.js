import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { observable, action, autorun } from "mobx"

import DropZone from "react-dropzone"

import Button from "../primitives/Button"

import { darkgrey } from "../colors"
import { Icon } from "@mdi/react"
import { mdiImage } from "@mdi/js"

// TODO translate
@observer
class ImageCapture extends React.Component {
  width = 320;    // We will scale the photo width to this
  height = 0;     // This will be computed based on the input stream

  @observable video = React.createRef();
  canvas = React.createRef();

  // This media stream is hooked up a single time,
  // when the component mounts.
  // It lasts as long as the component is on screen.
  @observable stream = null
  @observable imageData = null

  componentDidMount() {
    navigator
      .mediaDevices
      .getUserMedia({ video: { facingMode: "environment" }, audio: false})
      .then((stream) => this.stream = stream)
      .catch((err) => this.props.assembly.alert("An error occured! " + err))
  }

  render() {
    return (
      <Layout imageData={this.imageData}>
        { // A fallback, in case we can't access the camera directly.
          this.stream
          ? (
            this.imageData
            ? <div>
                <img alt="Your test strip report." src={this.imageData} />

                <Button
                  onClick={(ev) => {
                    this.imageData = null;

                    Object.keys(this.props.assembly.photos_uploaded)
                      .map(photo_id =>
                        this
                        .props
                        .assembly
                        .participant_account
                        .forget("strip_reports", { id: photo_id })
                      )

                    this.props.assembly.photos_uploaded = {}
                  }} >
                  {this.props.assembly.translate("survey.upload.retake")}
                </Button>
              </div>

            : <div>
                <video ref={this.video} >
                  <p>
                    Please allow access to your device's camera.
                  </p>
                  <p>
                    If you've denied permissions,
                    You may need to refresh the app to try again.
                  </p>
                </video>

                {this.props.children}

                <Button onClick={(ev) => this.captureImage()} >
                  {this.props.assembly.translate("survey.upload.upload_photo")}
                </Button>
              </div>
            )

          : <DropZone
              accept={["image/jpeg", "image/png"]}
              onDrop={(acceptedFiles, rejectedFiles) => {
                console.log(rejectedFiles)
                acceptedFiles.forEach(file => this.props.assembly.storePhoto(file))
              } }
            >
              <Instructions>
                <p>{this.props.assembly.translate("survey.upload.click_here")}</p>
                <Icon size="2rem" color={darkgrey} path={mdiImage} />
              </Instructions>
            </DropZone>
        }

        <canvas ref={this.canvas} style={{ display: "none" }}/>
      </Layout>
    )
  }

  constructor(props) {
    super(props)

    autorun(() => {
      if(this.video.current) {
        this.video.current.srcObject = this.stream;
        this.video.current.play();

        this.height = this.video.current.videoHeight /
          (this.video.current.videoWidth / this.width)

        this.video.current.setAttribute('width', this.width);
        this.video.current.setAttribute('height', this.height);

        this.canvas.current.setAttribute('width', this.width);
        this.canvas.current.setAttribute('height', this.height);
      }
    })
  }

  // Capture a photo by fetching the current contents of the video
  // and drawing it into a canvas,
  // then converting that to a PNG format data URL.
  // By drawing it on an offscreen canvas and then drawing that to the screen,
  // we can change its size and/or apply other changes before drawing it.
  @action captureImage() {
    var context = this.canvas.current.getContext('2d');

    this.height = this.video.current.videoHeight /
      (this.video.current.videoWidth / this.width)

    this.canvas.current.width = this.width;
    this.canvas.current.height = this.height;

    this.video.current.width = this.width;
    this.video.current.height = this.height;

    context.drawImage(this.video.current, 0, 0, this.width, this.height);

    this.imageData = this.canvas.current.toDataURL('image/png');
    this.props.onCapture(this.imageData)
  }
}

const Layout = styled.div`
`

const Instructions = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
`

export default ImageCapture
