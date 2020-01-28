import React from 'react';
import { inject, observer } from 'mobx-react';
import SimpleButton from '../../Basics/SimpleButton';
import Camera from '../../ImageCapture/Camera';

const ReportPhoto = inject("patientStore")(observer(({patientStore}) => {

    const handleNext = () => {
        patientStore.medicationStep += 1;
    }

    const handlePhoto = (photo) => {
        console.log(photo);
    }

    const handleExit = () => {
        patientStore.cameraIsOpen = false;
    }

    return(
        <div>
                <SimpleButton onClick={() => {patientStore.cameraIsOpen = true}}>Open Camera</SimpleButton>
                { patientStore.cameraIsOpen ? <Camera handleExit={handleExit} returnPhoto={handlePhoto} /> : ""}
        </div>
        )
}));


export default ReportPhoto;