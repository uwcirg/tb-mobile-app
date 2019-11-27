import React, { Component } from 'react';
import fixRotation from 'fix-image-rotation';
import Webcam from '../WebCam'
import './ClCamera.css';
import Button from '@material-ui/core/Button'
import { ThemeProvider, styled } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';

const PHOTO_LIST_NAME = "photoFileList";

@inject("uiStore")
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

        this.setState({
            capturing: true
        })

        let image = this.webcam.testFunc();
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

    batchUploads = () => {
        // this is where all the images saved can be uploaded as batch uploads
        const images = this.findLocalItems(/^cloudy_pwa_/);
        let error = false;
        if (images.length > 0) {
            //this.setState({ 'uploading': true });
            this.props.setImages(images);
            //this.setState({ 'uploading': false });
            if (!error) {
                alert("All saved images have been uploaded to your Cloudinary Media Library");
            }
        }
    }

    uploadImage = () => {

        if(this.props.uiStore.offline){
        const prefix = 'strip_report';
        const rs = Math.random().toString(36).substr(2, 5);
        const localStorageName = `${prefix}#${rs}`;

        //Add the filename to the list for the gallery
        let stringList = localStorage.getItem(PHOTO_LIST_NAME)
        let photoList = ""

        if (stringList) {
            //Add to the list of files
            photoList = JSON.parse(stringList);
            photoList.push(localStorageName)
            localStorage.setItem(PHOTO_LIST_NAME, JSON.stringify(photoList))
        } else {
            //Create new localstorage list
            photoList = JSON.stringify([localStorageName])
            localStorage.setItem(PHOTO_LIST_NAME, photoList)
        }

        let localFile = {}
        let date = new Date();

        localFile.image = this.state.capturedImage;
        localFile.dateTime = date.toISOString();

        localStorage.setItem(localStorageName, JSON.stringify(localFile));
        this.props.pushImage(localStorageName);
        this.discardImage();
    }else{
        this.setState({
            uploading: true
        })
        this.props.isUploading();
        window.setTimeout(() => {
            this.setState({uploading: false})
            this.props.hasUploaded()
            this.discardImage();
        }, 4000)
    }

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

    render() {

        const imageDisplay = this.state.capturedImage ?
            <img src={this.state.capturedImage} alt="captured" />
            :
            <span />;

        const buttons = this.state.captured ?
            <div className="camera-buttons">
                <DeleteButton variant="contained" color="secondary" onClick={this.discardImage} > Delete Photo </DeleteButton>
                 <Button variant="contained" color="primary"  onClick={this.uploadImage} > {this.props.uiStore.offline ? "Save Photo" : "Upload Photo"} </Button>
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