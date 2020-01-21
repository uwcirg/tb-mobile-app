import React from 'react';
import ClCamera from '../../ImageCapture/ClCamera'
import SimpleButton from '../../Basics/SimpleButton'

import { inject, observer } from 'mobx-react';

const uploadFile = (imageString) => {
    imageString = imageString.replace(/^data:image\/\w+;base64,/, "")
    const buf = new Buffer(imageString.replace(/^data:image\/\w+;base64,/, ""), 'base64')

    uploadFileHelper(buf,"http://localhost:9000/testbucket/test-a5f948e6-f831-48db-9803-58518bdba299.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=username%2F20200117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200117T213335Z&X-Amz-Expires=900&X-Amz-SignedHeaders=host&X-Amz-Signature=0d63faa46d3d3cae1dc89e72fc137407b41d52b1297e88bd317ce184f40cb028")
    
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



const ImageUploadFlow = inject("labPhotoStore","patientStore")(observer(({ labPhotoStore, patientStore, props }) => {
    

    const imagePass = (image) => {
        labPhotoStore.uploadPhoto(image);
    }

    return (
        <div>
            <SimpleButton onClick={() =>{patientStore.isLoggedIn = false}}> Back</SimpleButton>
            <ClCamera imagePass={imagePass} />

        </div>
    )
}));



export default ImageUploadFlow;