import React, { Component } from 'react';
import Webcam from './WebCam';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Fab from '@material-ui/core/Fab';
import ImageOverlay from './ImageOverlay';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.webcam = null;
    this.state = {
      capturedImage: null,
      captured: false,
      uploading: false,
      capturing: false,
    };
  }

  myRotationFunction = async function (ArrayOfFilesToBeRotated) {
    return ArrayOfFilesToBeRotated;
  };

  captureImage = async () => {
    let image = this.webcam.takePhoto();
    let captureHeight;

    image.getPhotoCapabilities().then((settings) => {
      if (settings) {
        //Makesure Adjusted size is in range of min-max
        captureHeight = settings.imageHeight.max / 2;

        if (captureHeight < settings.imageHeight.min) {
          captureHeight = settings.imageHeight.max;
        }
      }
      image
        .takePhoto({ imageHeight: captureHeight })
        .then((blob) => {
          this.myRotationFunction([blob]).then((test) => {
            let reader = new FileReader();
            reader.readAsDataURL(test[0]); // converts the blob to base64 and calls onload
            reader.onload = () => {
              this.setState({
                captured: true,
                capturedImage: reader.result,
                capturing: false,
              });

              this.handleUsePhoto();
            };
          });
        })
        .catch((error) => console.error('takePhoto() error:', error));
    });
  };

  discardImage = () => {
    this.setState({
      captured: false,
      capturedImage: null,
    });
  };

  componentDidMount() {
    // initialize the camera
    this.canvasElement = document.createElement('canvas');
    this.webcam = new Webcam(
      document.getElementById('webcam'),
      this.canvasElement,
      this.handleOutcome
    );

    this.webcam
      .setup()
      .then(() => {
        //TODO Handle success ?
      })
      .catch((err) => {
        this.props.handlePermissionsError();
      });
  }

  componentWillUnmount() {
    this.webcam.endVideo();
  }

  handleUsePhoto = () => {
    this.props.returnPhoto(this.state.capturedImage);
    this.props.handleExit();
  };

  render() {
    const imageDisplay = this.state.capturedImage ? (
      <img src={this.state.capturedImage} alt="captured" />
    ) : (
      <span />
    );

    const buttons = this.state.captured ? (
      <></>
    ) : (
      <div className="camera-buttons">
        <Fab onClick={this.captureImage}>
          <CameraAltIcon />
        </Fab>
      </div>
    );

    const exit = (
      <Exit>
        <Fab size="small" onClick={this.props.handleExit}>
          <CloseIcon />
        </Fab>
      </Exit>
    );

    return (
      <Container>
        {exit}
        <div className="webcam-container">
          <ImageOverlay />

          <video
            width="350px"
            autoPlay
            playsInline
            muted
            id="webcam"
            className={this.state.captured ? 'hidden' : ''}
          />
        </div>

        <br />
        <div className={'imageCanvas ' + this.state.captured ? '' : 'hidden'}>
          {imageDisplay}
        </div>

        {buttons}
      </Container>
    );
  }
}

const Exit = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  color: white;
  z-index: 13;
`;

const Container = styled.div`
  .hidden {
    visibility: hidden;
    display: none;
    height: 0px;
    margin: 0px;
    padding: 0px;
  }

  .imageCanvas {
    position: fixed;
    top: 0;
    z-index: 11;
    background-color: black;
    text-align: center;
  }

  img {
    position: fixed;
    top: 0;
    z-index: 11;
    background-color: black;
    height: 100vh;
    width: 100%;
    object-fit: cover;
    display: block;
    margin: auto;
  }

  #webcam {
    padding: 0;
    display: block;
    margin: auto;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .webcam-container {
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
  }

  .camera-buttons {
    position: fixed;
    bottom: 30px;
    left: 0;
    z-index: 12;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
