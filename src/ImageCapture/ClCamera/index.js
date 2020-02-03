import React, { Component } from 'react';
import fixRotation from 'fix-image-rotation';
import Webcam from '../WebCam'
//import './ClCamera.css';
import Button from '@material-ui/core/Button'
import { ThemeProvider, styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const PHOTO_LIST_NAME = "photoFileList";

@inject("uiStore","labPhotoStore")
@observer
export default class ClCamera extends Component {
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

                        this.props.labPhotoStore.photoTaken= true;
                        this.props.labPhotoStore.photoRender = reader.result;
                        
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
        this.props.labPhotoStore.photoTaken= false;
        this.setState({
            captured: false,
            capturedImage: null
        })
    }

    uploadImage = () => {
        this.props.labPhotoStore.photo = this.state.capturedImage;
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

    render() {

        const imageDisplay = this.state.capturedImage ?
            <img src={this.state.capturedImage} alt="captured" />
            :
            <span />;

        const buttons = this.state.captured ?
            <div className="camera-buttons">
                <DeleteButton variant="contained" color="secondary" onClick={this.discardImage} > Retake Photo </DeleteButton>
            </div> :
            <div className="camera-buttons">
                <Button variant="contained"  color="primary" onClick={this.captureImage} > Take Picture </Button>
            </div>


        return (
            <div>
                <ThemeProvider theme={theme}>

                <div className="webcam-container">
                <video width="350px" autoPlay playsInline muted id="webcam" className={this.state.captured ? "hidden" : ""} />
                </div>

                <br />
                <div className={"imageCanvas " + this.state.captured ? "" : "hidden"}>
                    {imageDisplay}
                </div>
                
                {buttons}
                </ThemeProvider>
            </div>
        )
    }
}

const theme = createMuiTheme({
    palette: {
      primary: {
          main: "#4791e2"
      }
    },
    typography:{
        button:{
            textTransform: "none"
        }
    }
  }); 

const DeleteButton = styled(Button)({
    marginLeft: "1em"
})