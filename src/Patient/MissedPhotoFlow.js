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
import SimpleButton from '../Basics/SimpleButton';
import Colors from '../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ReportButton from '../Components/ReportButton';
import Grid from '@material-ui/core/Grid'

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

    const handleSubmit = () => {

    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "numeric", month: "long" });

    const elementsToDisplay = photo ? <>
        <div className={classes.strip}>
            <img src={photo} />
            <ClickableText icon={<ReplayIcon />} text="Retake" />
            <Grid justify="flex-end" className={classes.fullWidth} container >
                <ReportButton className={classes.button} alignRight onClick={handleSubmit}>{t("patient.report.next")}</ReportButton>
            </Grid>
        </div>
    </> : <>
        {patientStore.eligibleForBackPhoto ? <>
            <PhotoPrompt onClick={() => { setCameraOpen(true) }} />
            <Info requestDateFormatted={requestDateFormatted} />
            {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
        </> : <>Not elligble</>}
    </>

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title="Submit Old Photo" />
        <div className={classes.container}>
            {elementsToDisplay}
        </div>
    </>)

});

const Info = ({ requestDateFormatted }) => {
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.topText} variant="body1" color="initial">
                You are reporting for the photo requested on <strong>{requestDateFormatted}</strong>.
            </Typography>
            <Typography className={classes.topText} variant="body1" color="initial">
                In the future please submit your test on the day it is requested so we can know you are doing well.
            </Typography>
            <TestStripPhotoInfo />
        </>
    )
}


export default MissedPhotoFlow;