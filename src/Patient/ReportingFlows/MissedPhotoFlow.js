import React, { useState } from 'react';
import TestStripPhotoInfo from '../../Components/Patient/TestStripPhotoInfo';
import PatientInformationAPI from '../../API/PatientInformationAPI';
import PhotoPrompt from '../../Components/Patient/PhotoPrompt';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import OverTopBar from '../Navigation/OverTopBar';
import Camera from '../../ImageCapture/Camera';
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import ClickableText from '../../Basics/ClickableText';
import ReplayIcon from '@material-ui/icons/Replay';
import { useTranslation } from 'react-i18next';
import ReportButton from '../../Components/ReportButton';
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
        display: "block",
        height: '50vh',
        width: '90%',
        "& > img": {
            objectFit: 'contain',
            height: '100%',
            width: '100%'
        },
        margin: 'auto'
    },
    fullWidth: {
        padding: "0 1em",
        boxSizing: "border-box"
    }
})

const MissedPhotoFlow = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [photo, setPhoto] = useState(false);
    const [response, setResponse] = useState(false);

    async function handleSubmit() {
        const report = await new PatientInformationAPI().submitBackPhotoReport(photo, patientStore.lastPhotoRequestStatus.dateOfRequest);
        setResponse(report);
    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "numeric", month: "long" });

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title={t('missedPhotoDetails.topBarText')} />
        <Typography className={classes.topText} variant="body1" color="initial">
            {t('missedPhotoDetails.requestedOn')}
            <br />
            <strong>{requestDateFormatted}</strong>.
        </Typography>
        <div className={classes.container}>
            {response ? <PostSubmissionView response={response} /> :
                <PreSubmissionView
                    requestDateFormatted={requestDateFormatted}
                    photo={photo}
                    eligible={patientStore.eligibleForBackPhoto}
                    setPhoto={setPhoto}
                />}
            {photo && <Grid justify="flex-end" className={classes.fullWidth} container>
                <ReportButton onClick={handleSubmit}>{t('coordinator.patientProfile.editDetails.submit')}</ReportButton>
            </Grid>}
        </div>
    </>)
});

const PostSubmissionView = ({ response }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const success = response.httpStatus === 201

    return (
        <Typography variant="body1" color="initial">
            {success ? "Success" : "Error"}
        </Typography>
    )
}

const PreSubmissionView = ({ photo, requestDateFormatted, eligible, setPhoto }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const [cameraOpen, setCameraOpen] = useState(false);

    const handleExit = () => {
        setCameraOpen(false);
    }

    const handlePhoto = (newPhoto) => {
        setPhoto(newPhoto);
        setCameraOpen(false);
    }

    return (<>
        {photo ? <>
            <div className={classes.strip}>
                <img src={photo} />
            </div>
            <div className={classes.fullWidth}>
                <ClickableText onClick={() => { setCameraOpen(true) }} icon={<ReplayIcon />} text={t('patient.report.photo.retakePhoto')} />
            </div>
        </> : <>
            {eligible ? <>
                <PhotoPrompt onClick={() => { setCameraOpen(true) }} />
                <Info requestDateFormatted={requestDateFormatted} />
            </> : <>Not elligble</>}
        </>}
        {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
    </>)
}

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