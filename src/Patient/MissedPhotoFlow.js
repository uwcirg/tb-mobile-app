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

const useStyles = makeStyles({
    container: {
        width: "100%",
        marginTop: "1em"
    },
    topText: {
        width: "90%",
        margin: "1em auto"
    }
})

const MissedPhotoFlow = observer(() => {

    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const [cameraOpen, setCameraOpen] = useState(false);

    const [photo, setPhoto] = useState(false);

    const handleExit = () => {
        setCameraOpen(false);
    }

    const handlePhoto = (newPhoto) => {
        setPhoto(newPhoto)
    }

    const requestDateFormatted = DateTime.fromISO(patientStore.lastPhotoRequestStatus.dateOfRequest).toLocaleString({ day: "2-digit", month: "long" });

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title="Submit Old Photo" />
        <div className={classes.container}>
            <PhotoPrompt onClick={() => { setCameraOpen(true) }} />
            <Typography className={classes.topText} variant="body1" color="initial">
                You are reporting for the photo requested on <strong>{requestDateFormatted}</strong>.
            </Typography>
            <Typography className={classes.topText} variant="body1" color="initial">
                In the future please submit your test on the day it is requested so we can know you are doing well.
            </Typography>
            <TestStripPhotoInfo />
            {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
        </div>
    </>)

});

export default MissedPhotoFlow;