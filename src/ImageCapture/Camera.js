import React, { Component } from 'react';
import fixRotation from 'fix-image-rotation';
import Webcam from './WebCam'
import Button from '../Basics/SimpleButton'
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close';
import Colors from '../Basics/Colors'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Fab from '@material-ui/core/Fab';

import { useTranslation } from 'react-i18next';


export default class Camera extends Component {
    constructor() {
        super();
        this.webcam = null;
        this.state = {
            capturedImage: null,
            captured: false,
            uploading: false,
            capturing: false

        }
    }

    myRotationFunction = async function (ArrayOfFilesToBeRotated) {
        let blobOfArray = await fixRotation.fixRotation(ArrayOfFilesToBeRotated)
        return blobOfArray
    }

    captureImage = async () => {

        let image = this.webcam.takePhoto();
        let captureHeight;

        image.getPhotoCapabilities().then(settings => {
            if (settings) {
                //Makesure Adjusted size is in range of min-max
                captureHeight = settings.imageHeight.max / 2;

                if (captureHeight < settings.imageHeight.min) {
                    captureHeight = settings.imageHeight.max;
                }
            }
            image.takePhoto({ imageHeight: captureHeight }).then(blob => {

                this.myRotationFunction([blob]).then(test => {
                    let reader = new FileReader();
                    reader.readAsDataURL(test[0]); // converts the blob to base64 and calls onload
                    reader.onload = () => {
                        this.setState({
                            captured: true,
                            capturedImage: reader.result,
                            capturing: false
                        })
                    };

                });
            })
                .catch(error => console.error('takePhoto() error:', error));
        });
    }

    discardImage = () => {
        this.setState({
            captured: false,
            capturedImage: null
        })
    }

    uploadImage = () => {
        
    }

    componentDidMount() {
        // initialize the camera
        this.canvasElement = document.createElement('canvas');
        this.webcam = new Webcam(
            document.getElementById('webcam'),
            this.canvasElement
        );
        this.webcam.setup().catch(() => {
            alert('Error getting access to your camera');
        });
    }

    componentWillUnmount() {
        this.webcam.endVideo();
    }

    handleUsePhoto = () => {
        this.props.returnPhoto(this.state.capturedImage);
        this.props.handleExit();
    }

    render() {

        const imageDisplay = this.state.capturedImage ?
            <img src={this.state.capturedImage} alt="captured" />
            :
            <span />;

        const buttons = this.state.captured ?
            <div className="camera-buttons">
                <Button variant="contained" color="secondary" onClick={this.discardImage} > <RetakePhoto /> </Button>
                <Button variant="contained" backgroundColor={Colors.green} onClick={this.handleUsePhoto} ><UsePhoto /></Button>
            </div> :
            <div className="camera-buttons">
                <Fab onClick={this.captureImage}><CameraAltIcon /></Fab>
            </div>

        const exit = (<Exit><IconButton onClick={this.props.handleExit}><CloseIcon /></IconButton></Exit>)


        return (
            <Container>
                {exit}
                <div className="webcam-container">
                <video width="350px" autoPlay playsInline muted id="webcam" className={this.state.captured ? "hidden" : ""} />
                </div>

                <br />
                <div className={"imageCanvas " + this.state.captured ? "" : "hidden"}>
                    {imageDisplay}
                </div>
                
                {buttons}
            </Container>
        )
    }
}

function RetakePhoto(){
    const {t, i18n} = useTranslation('translation');
    return <> {t("patient.report.photo.retakePhoto")} </>
}

function UsePhoto(){
    const {t, i18n} = useTranslation('translation');
    return <> {t("patient.report.photo.usePhoto")} </>
}

const CameraButton = styled.div`
height: 40px;
width: 40px;
border: solid 2px white;
border-radius: 40px;
background-color: lightgray;
display: flex;
justify-content: center;
align-content: center;
align-items: center;
`

const Exit = styled.div`
position: fixed;
top: 0px;
left: 10px;
color: white;
z-index: 12;
`

const Container = styled.div`

.hidden{
    visibility: hidden;
    display: none;
    height: 0px;
    margin: 0px;
    padding: 0px;
  }

.imageCanvas{
    position: fixed;
    top: 0;
    z-index: 11;
    background-color: black;
    text-align: center;
  }

  img{
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

  #webcam{
    padding: 0;
    display: block;
    margin: auto;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }

  .webcam-container{
    position: fixed;
    top: 0;
    z-index: 11;
    #background-color: black;

  }

  .camera-buttons{
      position: fixed;
      bottom: 60px;
      z-index: 12;
      width: 100%;
      display: flex;
      justify-content: center;

      button:first-of-type{
        margin-right: 1em;
      }
      
  }


`