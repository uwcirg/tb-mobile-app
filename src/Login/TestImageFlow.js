import React, { useEffect } from 'react';
import ClCamera from '../ImageCapture/Camera'
import SimpleButton from '../Basics/SimpleButton'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch'

import { inject, observer } from 'mobx-react';

const uploadFile = (imageString) => {
    imageString = imageString.replace(/^data:image\/\w+;base64,/, "")
    const buf = new Buffer(imageString.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    uploadFileHelper(buf, "http://localhost:9000/testbucket/test-a5f948e6-f831-48db-9803-58518bdba299.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=username%2F20200117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200117T213335Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=0d63faa46d3d3cae1dc89e72fc137407b41d52b1297e88bd317ce184f40cb028")

}

function uploadFileHelper(file, url) {

    fetch(url, {
        method: 'PUT',
        body: file
    }).then(() => {
        console.log("success")
        // If multiple files are uploaded, append upload status on the next line.
        //document.querySelector('#status').innerHTML += `<br>Uploaded ${file.name}.`;
    }).catch((e) => {
        console.error(e);
    });
}


@inject("labPhotoStore", "patientStore")
@observer
class ImageUploadFlow extends React.Component {


    imagePass = (image) => {
        this.props.labPhotoStore.uploadPhoto(image);
    }

    componentDidMount() {
        localStorage.setItem("user.type", "ImageTest");
    }

    handleChange = (e) =>{
        this.props.labPhotoStore.formResults[e.target.id] = e.target.value;
    }

    handleBack = () => { 
        this.props.patientStore.isLoggedIn = false; 
        this.props.labPhotoStore.clearStore();
        this.props.handleBack();
    }

    render() {
        return (
            <div>
                <TopBar>
        <a onClick={this.handleBack}><span>{"< "}Back To Home</span></a>
                </TopBar>

        {this.props.labPhotoStore.serverRecievedResult ?<ServerVerification clear={this.props.labPhotoStore.clearStore} response={this.props.labPhotoStore.serverResponse} /> :
                <div>
                <ClCamera imagePass={this.imagePass} />

                {this.props.labPhotoStore.photoTaken ? 
                <FieldContainer>
                <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={this.props.labPhotoStore.testWasRun}
                                onChange={() => { this.props.labPhotoStore.testWasRun = !this.props.labPhotoStore.testWasRun }}
                                value="testRun"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label={`Was test run? : ${this.props.labPhotoStore.testWasRun}`}/>

                    <FormControlLabel
                        control={
                            <Switch
                                color="primary"
                                checked={this.props.labPhotoStore.isTestPositive}
                                onChange={() => { this.props.labPhotoStore.isTestPositive = !this.props.labPhotoStore.isTestPositive }}
                                value="testPositive"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        }
                        label={`Was sample positive? : ${ this.props.labPhotoStore.isTestPositive}`}
                    />
                    <TextField id="testId" type="number" label="Test ID (Number of Strip Test" onChange={this.handleChange} />
                    <TextField id="description" label="Test Description" onChange={this.handleChange}  />
                    <TextField id="minutesSinceTest" type="number" label="Minutes since test was run" onChange={this.handleChange} />
                    <SimpleButton onClick={this.props.labPhotoStore.uploadSubmission}> Submit</SimpleButton>

                </FieldContainer> : ""}
                    </div> }
            </div>
        )
    }
}

const ServerVerification = (props) => {
    return (
        <div>
            {props.response.url ?
            <div>
            <p>This image was posted to the server</p>
            <img src={props.response.url} />
            </div> : <p> There was a problem sending the image to the server. Please try again, and make sure all fields have been filled in</p>}
            <SimpleButton onClick={props.clear}>Log another result</SimpleButton>
        </div>
    )
}

const TopBar = styled.div`
color: white;
background-color: black;
padding: 2em;


`



const FieldContainer = styled.div`
margin: 100px auto 100px auto;
display: flex;
flex-direction: column;

width: 80%;

input{
    padding: 2em;
    margin-top: 1em;
}



button{
    margin-top: 1em;
}



`



export default ImageUploadFlow;