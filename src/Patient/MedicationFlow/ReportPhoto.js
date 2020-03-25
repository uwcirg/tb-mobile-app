import React from 'react';
import { inject, observer } from 'mobx-react';
import SimpleButton from '../../Basics/SimpleButton';
import ButtonBase from '@material-ui/core/ButtonBase'
import Camera from '../../ImageCapture/Camera';
import styled from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../Basics/Colors'
import useStores from '../../Basics/UseStores';
import ClickableText from '../../Basics/ClickableText';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({

    info:{
        marginLeft: "10%",
        fontSize: "1em"
    }

})

const ReportPhoto = observer((props) => {

    const classes = useStyles();

    const {patientStore} = useStores();
    patientStore.report.headerText = "Please capture photo of test strip"

    const handlePhoto = (photo) => {
        patientStore.report.photoString = photo;
        patientStore.photoWasTaken = true;
    }

    const handleExit = () => {
        patientStore.uiState.cameraIsOpen = false;
    }

    return(
        <div style={{width: "100%"}}>
                {patientStore.photoWasTaken ?
                <StripPhoto><img src={patientStore.report.photoString}/> </StripPhoto>
                    : 
                <>
                <ButtonBase style={{width:"90%",margin:"5%"}}>
                    <PhotoPrompt onClick={() => {patientStore.uiState.cameraIsOpen = true}}>
                        <CameraAltIcon />
                        Open Camera
                    </PhotoPrompt>
                </ButtonBase>
                <ClickableText className={classes.info} hideIcon onClick={props.toggle} text="Show Me How" />
                </>}
             <SimpleButton alignRight onClick={patientStore.photoSubmission} disabled={!patientStore.photoWasTaken} backgroundColor={Colors.green}>Continute</SimpleButton>
            {patientStore.uiState.cameraIsOpen ? <Camera handleExit={handleExit} returnPhoto={handlePhoto} /> : ""}
        </div>
        )
});

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