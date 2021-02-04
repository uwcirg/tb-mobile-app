import React, { useState } from 'react';
import { observer } from 'mobx-react';
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
import WarningBox from '../../Basics/WarningBox';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import Grow from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'

import TimeIcon from '@material-ui/icons/Update';

const useStyles = makeStyles({

    info: {
        fontSize: "1em",
        width: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        margin: ".5em 0 .5em 0",
        "& > span": {
            alignItems: "center",
            display: "flex",
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
    title: {
        fontSize: "1.25em",
        textAlign: "left",
        marginLeft: "1em"
    },
    button: {
        width: "90%",
        margin: "auto",
        display: "flex",
        color: Colors.buttonBlue,
        "& > div": {
            borderColor: Colors.buttonBlue,
            border: "solid 2px",
        },
        borderRadius: "10px",
    },
    buttonText: {
        fontSize: "1.25em",
        fontWeight: "bold",
        textAlign: "center",
        width: "auto"
    },
    infoBox: {
        width: "90%",
        margin: "auto",
        marginBottom: ".5em",
        marginTop: ".5em"
    },
    leftMargin: {
        marginLeft: "1.5em"
    },
    photoPrompt: {
        width: "100%",
        display: "flex",
        borderRadius: "10px",
        padding: "1em",
        justifyContent: "center"
    },
    cantSubmit: {
        width: '90%',
        margin: "auto",
        marginTop: '2em',
        "& > div": {
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '1em'
        }
       
    },
    photoInfo: {
        "& > h2": {
            fontSize: "1em",
            margin: ".5em 0 .5em 0"
        },
        "& > ul": {
            display: "block",
            margin: "0",
            padding: 0,
            marginLeft: "1em",
            "& > li": {
                margin: 0,
                padding: 0,
                "& > span": {
                    fontWeight: "bold"
                },
                "& > li": {
                    marginLeft: "1em",
                }
            }
        },
    },
    later: {
        color: "green"
    },
    unable: {
        color: "red",
        margin: ".5em 0"
    }

})

const ReportPhoto = observer((props) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

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

    const handleNext = () => {
        patientStore.photoSubmission();
        patientStore.reportStore.submitPhoto();

        if (!patientUIStore.skippedToPhotoFlow) {
            props.advance();
        } else {
            patientUIStore.goToHome();
            patientUIStore.skippedToPhotoFlow = false;
        }
    }

    const nextDisabled = () => {
        if(patientStore.report.photoWasSkipped){
            return !patientStore.report.whyPhotoWasSkipped;
        }
        return !patientStore.report.photoWasTaken;
    }

    return (
        <div style={{ width: "100%" }}>

            {!patientStore.report.photoWasSkipped ? <>
                {patientStore.report.photoWasTaken ?
                    <>
                        <StripPhoto><img src={patientStore.report.photoString} /> </StripPhoto>
                        <ClickableText className={`${classes.info} ${classes.leftMargin}`} hideIcon onClick={handleRetake} text={t("patient.report.photo.retakePhoto")} />
                    </>
                    :
                    <>
                        <ButtonBase onClick={() => { patientStore.uiState.cameraIsOpen = true }} className={classes.button}>
                            <PhotoPrompt >
                            </PhotoPrompt>
                        </ButtonBase>
                        <PhotoInfo />
                    </>}

                <Buttons />
            </> : <CantTakePhoto />}

            <SimpleButton alignRight onClick={handleNext} disabled={nextDisabled()} backgroundColor={Colors.green}>{t("patient.report.next")}</SimpleButton>
            {patientStore.uiState.cameraIsOpen ? <Camera handleExit={handleExit} returnPhoto={handlePhoto} /> : ""}

        </div>
    )
});

const PhotoInfo = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { patientUIStore } = useStores();
    const togglePopUp = () => { setShowPopUp(!showPopUp) }
    const [showPopUp, setShowPopUp] = useState(false);

    return (
        <WarningBox className={classes.infoBox}>
            <div className={classes.photoInfo}>
                <h2>{t('patient.report.photo.help.remember')}:</h2>
                <ul>
                    <li>{t('patient.report.photo.help.wait')}</li>
                    <li>{t('patient.report.photo.help.straight')}</li>
                    <li>Retake photo if it is blury or the square marker is not visible </li>
                </ul>
                <ClickableText onClick={togglePopUp} className={classes.info} hideIcon text={<span>{t('patient.report.photo.help.instructions')}<KeyboardArrowRight /></span>} />
                <Grow in={showPopUp}>
                    <div className={classes.instructions}>
                        <Instructions />
                    </div>
                </Grow>
            </div>

        </WarningBox>
    )
}

const Buttons = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { patientUIStore, patientStore } = useStores();

    return (
        <div style={{ padding: "1em" }}>
            <ClickableText
                className={classes.later}
                onClick={patientUIStore.goToHome}
                text={<>Submit Later <KeyboardArrowRight /></>} icon={<TimeIcon />} />
            <ClickableText className={classes.unable} text={<>Unable to submit? Tell us why <KeyboardArrowRight /></>} onClick={() => { patientStore.report.photoWasSkipped = true }} />
        </div>

    )
}


const CantTakePhoto = observer((props) => {

    const { patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.cantSubmit}>
            <TextField rows={3} label={"Why are you unable to submit?"} multiline value={patientStore.report.whyPhotoWasSkipped} onChange={(e) => { patientStore.report.whyPhotoWasSkipped = e.target.value }} className={classes.textArea} variant="outlined" />
            <ClickableText icon={<KeyboardArrowLeft />} onClick={() => { patientStore.report.photoWasSkipped = false }} text={"Back to Submit Photo"} />
        </div>
    )
});


const PhotoPrompt = () => {

    const classes = useStyles();
    const { t } = useTranslation();

    return (<div className={classes.photoPrompt}>
        <CameraAltIcon />
        <Typography variant="body1" className={classes.buttonText}>
            {t("patient.report.photo.openCamera")}
        </Typography>
    </div>)
}

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