import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import OverTopBar from './Navigation/OverTopBar';
import TestStripPhotoInfo from '../Components/Patient/TestStripPhotoInfo';
import PhotoPrompt from '../Components/Patient/PhotoPrompt';
import Camera from '../ImageCapture/Camera';
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import ClickableText from '../Basics/ClickableText';
import ReplayIcon from '@material-ui/icons/Replay';
import { useTranslation } from 'react-i18next';
import ReportButton from '../Components/ReportButton';
import Grid from '@material-ui/core/Grid'
import PatientInformationAPI from '../API/PatientInformationAPI';

const useStyles = makeStyles({
    container: {
        width: "100%",
        marginTop: "1em",
    },
    topText: {
        width: "90%",
        margin: "1em auto"
    },
    strip: {
        height: '50vh',
        width: '90%',
        "& > img": {
            objectFit: 'contain',
            height: '100%',
            width: '100%'
        },
        margin: 'auto'
    },
    fullWidth:{
        width: "100%"
    }
})

const MissedPhotoFlow = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [cameraOpen, setCameraOpen] = useState(false);

    const [photo, setPhoto] = useState(false);

    const handleExit = () => {
        setCameraOpen(false);
    }

    const handlePhoto = (newPhoto) => {
        setPhoto(newPhoto);
        handleExit();
    }

    async function handleSubmit(){
        const success = await new PatientInformationAPI().submitBackPhotoReport(photo);
        console.log(success);
    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "numeric", month: "long" });

    const elementsToDisplay = photo ? <>
        <div className={classes.strip}>
            <img src={photo} />
            <ClickableText onClick={()=>{setCameraOpen(true)}} icon={<ReplayIcon />} text={t('patient.report.photo.retakePhoto')} />
            <Grid justify="flex-end" className={classes.fullWidth} container >
                <ReportButton className={classes.button} alignRight onClick={handleSubmit}>{t('coordinator.patientProfile.editDetails.submit')}</ReportButton>
            </Grid>
        </div>
    </> : <>
        {patientStore.eligibleForBackPhoto ? <>
            <PhotoPrompt onClick={() => { setCameraOpen(true) }} />
            <Info requestDateFormatted={requestDateFormatted} />
        </> : <>Not elligble</>}
    </>

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title="Submit Old Photo" />
        <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.requestedOn')} 
                <br />
                <strong>{requestDateFormatted}</strong>.
            </Typography>
        <div className={classes.container}>
            {elementsToDisplay}
        </div>
        {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
    </>)
});

const Info = () => {
    
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <>
            <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.future')}
            </Typography>
            <TestStripPhotoInfo />
        </>
    )
}


export default MissedPhotoFlow;