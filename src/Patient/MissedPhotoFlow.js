import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import OverTopBar from './Navigation/OverTopBar';
import TestStripPhotoInfo from '../Components/Patient/TestStripPhotoInfo';
import PhotoPrompt from '../Components/Patient/PhotoPrompt';
import Camera from '../ImageCapture/Camera';


const useStyles = makeStyles({
    container:{
        width: "100%",
        marginTop: "2em"
    }
})

const MissedPhotoFlow = () => {

    const classes = useStyles();
    const { patientUIStore } = useStores();
    const [cameraOpen,setCameraOpen] = useState(false);

    const [photo,setPhoto] = useState(false);

    const handleExit = () => {
        setCameraOpen(false);
    }

    const handlePhoto = (newPhoto) => {
        setPhoto(newPhoto)
    }

    return (<>
        <OverTopBar notFixed handleBack={patientUIStore.goToHome} title="Submit Old Photo" />
        <div className={classes.container}>
            <PhotoPrompt onClick={()=>{setCameraOpen(true)}} />
            <TestStripPhotoInfo />
            {cameraOpen && <Camera handleExit={handleExit} returnPhoto={handlePhoto} />}
        </div>
    </>)

}

export default MissedPhotoFlow;