import React from 'react';
import { observer } from 'mobx-react';
import SimpleButton from '../../Basics/SimpleButton';
import Camera from '../../ImageCapture/Camera';
import Colors from '../../Basics/Colors'
import useStores from '../../Basics/UseStores';
import ClickableText from '../../Basics/ClickableText';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import TextField from '@material-ui/core/TextField'
import TimeIcon from '@material-ui/icons/Update';
import TestStripPhotoInfo from '../../Components/Patient/TestStripPhotoInfo';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
0
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
        if (patientStore.report.photoWasSkipped) {
            return !patientStore.report.whyPhotoWasSkipped;
        }
        return !patientStore.report.photoWasTaken;
    }

    return (
        <div style={{ width: "100%" }}>
            {!patientStore.report.photoWasSkipped ? <>
                {patientStore.report.photoWasTaken ?
                    <>
                        <div className={classes.strip}><img src={patientStore.report.photoString} /> </div>
                        <ClickableText className={`${classes.info} ${classes.leftMargin}`} hideIcon onClick={handleRetake} text={t("patient.report.photo.retakePhoto")} />
                    </>
                    :
                    <>
                        <PhotoPrompt onClick={() => { patientStore.uiState.cameraIsOpen = true }} />
                        <TestStripPhotoInfo />
                    </>}

                {!patientStore.report.photoWasTaken && <Buttons />}
            </> : <CantTakePhoto />}
            <SimpleButton alignRight onClick={handleNext} disabled={nextDisabled()} backgroundColor={Colors.green}>{t("patient.report.next")}</SimpleButton>
            {patientStore.uiState.cameraIsOpen ? <Camera handleExit={handleExit} returnPhoto={handlePhoto} /> : ""}
        </div>
    )
});

const Buttons = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const { patientUIStore, patientStore } = useStores();

    return (
        <div className={classes.cantSubmitContainer}>
            <ClickableText
                className={classes.later}
                onClick={patientUIStore.goToHome}
                text={<>{t('patient.report.photo.submitLater')} <KeyboardArrowRight /></>} icon={<TimeIcon />} />
            <ClickableText className={classes.unable} text={<>{t('patient.report.photo.unable')} <KeyboardArrowRight /></>} onClick={() => { patientStore.report.photoWasSkipped = true }} />
        </div>
    )
}

const CantTakePhoto = observer((props) => {

    const { patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <div className={classes.cantSubmit}>
            <TextField rows={3} label={t('patient.report.photo.whyUnable')} multiline value={patientStore.report.whyPhotoWasSkipped} onChange={(e) => { patientStore.report.whyPhotoWasSkipped = e.target.value }} className={classes.textArea} variant="outlined" />
            <ClickableText icon={<KeyboardArrowLeft />} onClick={() => { patientStore.report.photoWasSkipped = false }} text={t('patient.report.photo.back')} />
        </div>
    )
});

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
    leftMargin: {
        marginLeft: "1.5em"
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
    later: {
        color: "green"
    },
    unable: {
        color: "red",
        margin: ".5em 0"
    },
    strip: {
        height: '50vh',
        width: '90%',
        "& >img": {
            objectFit: 'contain',
            height: '100%',
            width: '100%'
        },
        margin: 'auto',
        textAlign: 'center'
    },
    cantSubmitContainer: {
        padding: "1em",
        width: "60%"
    }

})


export default ReportPhoto;