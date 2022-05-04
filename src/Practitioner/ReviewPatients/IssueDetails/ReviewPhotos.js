import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { CameraAlt, ChevronRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import ReviewPhotoPopOver from '../../Shared/ReviewPhotoPopOver';
import PatientIssuesContext from '../PatientIssuesContext'
import IssueSection from './IssueSection';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    photoReport: {
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: ".5em",
        width: "100%",
        borderRadius: "4px",
        backgroundColor: "white"
    }
})

const ReviewPhotos = ({ patient }) => {

    const { patients, setPatients } = useContext(PatientIssuesContext)
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const markPhotoAsComplete = (patientId, photoId) => {
        let newPatients = [...patients];
        const patientIndex = newPatients.findIndex(each => { return each.id === patientId })
        if (patientIndex < 0) return;
        const photoIndex = newPatients[patientIndex].unreviewedPhotos.findIndex(each => { return each.photoId === photoId })
        if (photoIndex < 0) return;
        newPatients[patientIndex].unreviewedPhotos.splice(photoIndex, 1)
        setPatients(newPatients);
    }

    return (
        <>
            <ReviewPhotoPopOver markPhotoAsComplete={markPhotoAsComplete} unreviewedPhotos={patient.unreviewedPhotos} />
            <IssueSection icon={CameraAlt} title={t('coordinator.cardTitles.photosToReview')} number={patient.issues.unreviewedPhotos.length}>
                <div>
                    {patient.unreviewedPhotos.map(photo => <PhotoToReview key={`photo-to-review-${photo.photoId}`} photo={photo} />)}
                </div>
            </IssueSection>
        </>
    )
}

const PhotoToReview = ({ photo }) => {
    const classes = useStyles();

    return (<>
        <ButtonBase disableTouchRipple component={Link} to={`?review-photo=${photo.photoId}`} className={classes.photoReport}>
            <Typography>{DateTime.fromISO(photo.createdAt).toLocaleString({ day: "numeric", month: "short" })}</Typography>
            <Box flexGrow="1" />
            <img style={{ display: "block" }} width="50px" src={photo.url} />
            <ChevronRight />
        </ButtonBase>
        <Box height="5px" />
    </>)
}

export default ReviewPhotos;