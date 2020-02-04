import React from 'react';
import { inject, observer } from 'mobx-react';
import SimpleButton from '../../Basics/SimpleButton';
import ButtonBase from '@material-ui/core/ButtonBase'
import Camera from '../../ImageCapture/Camera';
import styled from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../Basics/Colors'

const ReportPhoto = inject("patientStore")(observer(({patientStore}) => {

    const handleNext = () => {
        patientStore.medicationStep += 1;
    }

    const handlePhoto = (photo) => {
        patientStore.photoString = photo;
        patientStore.photoWasTaken = true;
    }

    const handleExit = () => {
        patientStore.cameraIsOpen = false;
    }

    return(
        <div style={{width: "100%"}}>
                {patientStore.photoWasTaken ?
                <StripPhoto><img src={patientStore.photoString}/> </StripPhoto>
                    
                    : 
                <ButtonBase style={{width:"90%",margin:"5%"}}>
                    <PhotoPrompt onClick={() => {patientStore.cameraIsOpen = true}}>
                        <CameraAltIcon />
                        Open Camera
                    </PhotoPrompt>
                </ButtonBase>}
                <ButtonContainer><SimpleButton onClick={handleNext} disabled={!patientStore.photoWasTaken} backgroundColor={Colors.green}>Continute</SimpleButton></ButtonContainer>
                {patientStore.cameraIsOpen ? <Camera handleExit={handleExit} returnPhoto={handlePhoto} /> : ""}
                
        </div>
        )
}));

const ButtonContainer = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;

button{
    margin-right: 1em;
}
`

const PhotoPrompt = styled.div`
width: 100%;
height: 150px;
background-color: lightgray;
display: flex;
justify-content: center;
flex-direction: column;
align-content: center;
align-items: center;
padding: 1em;
border-radius: 10px;
font-size: 1.5em;
svg{
    width: 2em;
    height: 2em;
}
`

const StripPhoto = styled.div`
height: 50vh;
width: 90%;
img{
   object-fit: contain; 
   height: 100%;
   width: 100%;
}

margin: auto;
text-align: center;
`


export default ReportPhoto;