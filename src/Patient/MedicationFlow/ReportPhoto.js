import React, { useState } from 'react';
import {observer } from 'mobx-react';
import SimpleButton from '../../Basics/SimpleButton';
import ButtonBase from '@material-ui/core/ButtonBase'
import Camera from '../../ImageCapture/Camera';
import styled from 'styled-components';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../Basics/Colors'
import useStores from '../../Basics/UseStores';
import ClickableText from '../../Basics/ClickableText';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import PopUp from '../Navigation/PopUp';
import Instructions from '../Information/TestInstructions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({

    info: {
        paddingLeft: "1.5em",
        fontSize: "1em",
        width: "100%",
        justifyContent: "left",
        "& > span": {
            textAlign: "left",
            width: "100%",
            textTransform: "none"
        }
    },
    popUp: {
        height: "90vh",
        width: "85%",
        overflowY: "scroll"
    },
    title:{
        fontSize: "1.25em",
        textAlign: "left",
        marginLeft: "1em"
    },
    button:{ 
        width: "90%", 
        margin: "5%",
        color: Colors.buttonBlue,
        "& > div":{
            borderColor: Colors.buttonBlue,
            border: "solid 2px",
        },
        borderRadius: "10px"
    },
    buttonText:{
        width: "70%",
        fontSize: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent:"center"
    }

})

const ReportPhoto = observer((props) => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const [showPopUp, setShowPopUp] = useState(false);

    const { patientStore, patientUIStore } = useStores();
    patientStore.report.headerText = t("patient.report.photoTitle")

    const handlePhoto = (photo) => {
        patientStore.report.photoString = photo;
        patientStore.report.photoWasTaken = true;
    }

    const handleExit = () => {
        patientStore.uiState.cameraIsOpen = false;
    }

    const handleRetake = () => {
        patientStore.report.photoWasTaken = false;
        patientStore.uiState.cameraIsOpen = true;
    }

    const togglePopUp = () => { setShowPopUp(!showPopUp) }

    const handleNext = () => {
        patientStore.photoSubmission();

        if (!patientUIStore.skippedToPhotoFlow) {
            props.advance();
        } else {
            patientUIStore.goToHome();
            patientUIStore.skippedToPhotoFlow = false;
        }
    }

    return (
        <div style={{ width: "100%" }}>
            {showPopUp && <PopUp className={classes.popUp} handleClickAway={togglePopUp}>
                <h1 className={classes.title}>Instrucciones</h1>
                <Instructions />
            </PopUp>}
            {patientStore.report.photoWasTaken ?
                <>
                    <StripPhoto><img src={patientStore.report.photoString} /> </StripPhoto>
                    <ClickableText className={classes.info} hideIcon onClick={handleRetake} text={t("patient.report.photo.retakePhoto")} />
                </>
                :
                <>
                    <ButtonBase className={classes.button}>
                        <PhotoPrompt onClick={() => { patientStore.uiState.cameraIsOpen = true }}>
                            <CameraAltIcon />
                            <Typography variant="body1" className={classes.buttonText}>
                                {t("patient.report.photo.openCamera")}
                                </Typography>
                        </PhotoPrompt>
                    </ButtonBase>
                    <ClickableText onClick={togglePopUp} className={classes.info} hideIcon text={<span>{t("patient.report.photo.how")}</span>} />

                </>}
            <SimpleButton alignRight onClick={handleNext} disabled={!patientStore.report.photoWasTaken} backgroundColor={Colors.green}>{t("patient.report.next")}</SimpleButton>
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