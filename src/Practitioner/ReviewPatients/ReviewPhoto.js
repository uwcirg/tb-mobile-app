import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import PatientIssueContext from './PatientIssuesContext';
import ReviewPhotoPopOver from '../Shared/ReviewPhotoPopOver';


const ReviewPhoto = observer(() => {


    const { patients, setPatients } = useContext(PatientIssueContext)
    const { uiStore } = useStores();
    const photoId = parseInt(new URLSearchParams(uiStore.urlSearchParams).get("review-photo"));

    const photo = patients?.map(_patient => { return _patient.unreviewedPhotos }).flat().find(_photo => { return _photo.photoId === photoId });

    const markPhotoAsComplete = (patientId, photoId) => {
        let newPatients = [...patients];
        const patientIndex = newPatients.findIndex(each => { return each.id === patientId })
        if (patientIndex < 0) return;
        const photoIndex = newPatients[patientIndex].unreviewedPhotos.findIndex(each => { return each.photoId === photoId })
        if (photoIndex < 0) return;
        newPatients[patientIndex].unreviewedPhotos.splice(photoIndex, 1)
        setPatients(newPatients);
    }

    const exitPopover = () => { uiStore.push("/") }

    return (<>
        {photo && <ReviewPhotoPopOver
            handleSuccess={exitPopover}
            handleExit={exitPopover}
            markPhotoAsComplete={markPhotoAsComplete}
            photo={photo} />}
    </>)

});

export default ReviewPhoto;