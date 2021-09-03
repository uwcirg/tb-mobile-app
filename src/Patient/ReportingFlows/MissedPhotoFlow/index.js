import React, { useState } from 'react';
import TestStripPhotoInfo from '../../../Components/Patient/TestStripPhotoInfo';
import PatientInformationAPI from '../../../API/PatientInformationAPI';
import PhotoPrompt from '../../../Components/Patient/PhotoPrompt';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import OverTopBar from '../../Navigation/OverTopBar';
import Camera from '../../../ImageCapture/Camera';
import Typography from '@material-ui/core/Typography'
import { DateTime } from 'luxon';
import { observer } from 'mobx-react';
import ClickableText from '../../../Basics/ClickableText';
import ReplayIcon from '@material-ui/icons/Replay';
import { useTranslation } from 'react-i18next';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import BottomButton from './BottomButton';
import { CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import GenericErrorMessage from '../../../Components/GenericErrorMessage';

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
    errorMessage: {
        minHeight: "50vh"
    },
    notEligible: {
        padding: "1em",
        minHeight: "50vh"
    },
    fullWidth: {
        padding: "0 1em",
        boxSizing: "border-box"
    },
    loading: {
        height: "80vh"
    }
})

const MissedPhotoFlow = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [photo, setPhoto] = useState(false);
    const [response, setResponse] = useState(false);
    const [loading, setLoading] = useState(false);

    const eligible = patientStore.eligibleForBackPhoto;

    const handleSubmit = () => {
        setLoading(true);
        new PatientInformationAPI().submitBackPhotoReport(photo, patientStore.lastPhotoRequestStatus.dateOfRequest).then(report => {
            setLoading(false);
            setResponse(report);
        })
    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "numeric", month: "long" });

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title={t('missedPhotoDetails.topBarText')} />
        <div className={classes.container}>
            {response ? <PostSubmissionView response={response} /> :
                <PreSubmissionView
                    requestDateFormatted={requestDateFormatted}
                    photo={photo}
                    eligible={eligible}
                    setPhoto={setPhoto}
                    handleSubmit={handleSubmit}
                    loading={loading}
                />}
        </div>
    </>)
});

const PostSubmissionView = ({ response }) => {

    const success = response.httpStatus < 400;

    return (
        <>
            {success ? <Confirmation /> : <Error />}
        </>
    )
}

const Error = () => {
    
    const { patientUIStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <>
        <div className={classes.notEligible}>
            <GenericErrorMessage />
        </div>
        <BottomButton onClick={patientUIStore.goToHome}>{t('patient.report.symptoms.warning.button')}</BottomButton>
        </>
    )
}

const Loading = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.loading} alignItems="center" justify="center" container>
            <CircularProgress variant="indeterminate" />
        </Grid>
    )
}

const PreSubmissionView = ({ photo, eligible, setPhoto, handleSubmit, requestDateFormatted, loading }) => {

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

    if (loading) {
        return (<Loading />);
    }

    return (<>
        {photo ? <>
            <div className={classes.strip}>
                <img src={photo} />
            </div>
            <div className={classes.fullWidth}>
                <ClickableText onClick={() => { setCameraOpen(true) }} icon={<ReplayIcon />} text={t('patient.report.photo.retakePhoto')} />
            </div>
            <BottomButton disabled={(eligible && !photo)} onClick={handleSubmit}>{t('coordinator.patientProfile.editDetails.submit')}</BottomButton>
        </> : <>
            {eligible ? <>
                <BackSubmissionText photo={photo !== false} requestDateFormatted={requestDateFormatted} />
                <PhotoPrompt onClick={() => { setCameraOpen(true) }} />
                <TestStripPhotoInfo />
            </> : <NotEligible />}
        </>}
        {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
    </>)
}

const BackSubmissionText = ({ requestDateFormatted, photo }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.requestedOn')}
                <br />
                <strong>{requestDateFormatted}</strong>.
            </Typography>
            {!photo && <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.future')}
            </Typography>}
        </>
    )
}

const NotEligible = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore } = useStores();

    return (
        <>
            <div className={classes.notEligible}>
                <Typography variant="body1" className={classes.fullWidth}>
                    {t('missedPhotoDetails.notRequired')}
                </Typography>
            </div>
            <BottomButton onClick={patientUIStore.goToHome}>{t('patient.report.symptoms.warning.button')}</BottomButton>
        </>
    )
}

const Confirmation = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();

    const handleConfirmation = () => {
        patientUIStore.goToHome();
        patientStore.initalize();
    }

    return (
        <>
            <div className={classes.notEligible}>
                <ConfirmationLayout title={t('commonWords.successMessage')} />
                <Typography align="center" variant="body1" color="initial">{t('missedPhotoDetails.confirmation')}</Typography>
            </div>
            <BottomButton onClick={handleConfirmation}>{t('patient.home.completed.title')}</BottomButton>
        </>
    )
}

export default MissedPhotoFlow;