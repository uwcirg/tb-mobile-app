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
import LoadS3Image from '../../../Components/Shared/LoadS3Image';
import Label from '../../../Components/Label';
import Colors from '../../../Basics/Colors';

const useStyles = makeStyles({
    photoReport: {
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: ".5em",
        width: "100%",
        borderRadius: "4px",
        backgroundColor: "white",
        border: "solid 1px lightgray"
    }
})

const ReviewPhotos = ({ patient }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<IssueSection icon={CameraAlt} title={t('coordinator.cardTitles.photosToReview')} number={patient.issues.unreviewedPhotos.length}>
                <div>
                    {patient.unreviewedPhotos.map(photo => <PhotoPreview key={`photo-to-review-${photo.photoId}`} photo={photo} />)}
                </div>
            </IssueSection>)
}

const PhotoPreview = ({ photo }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<>
        <ButtonBase disableTouchRipple component={Link} to={`?review-photo=${photo.photoId}`} className={classes.photoReport}>
            <Typography>{DateTime.fromISO(photo.createdAt).toLocaleString({ day: "numeric", month: "short" })}</Typography>
            {(!photo.backSubmission && photo.isRedo) && <Box paddingLeft="1em"><Label backgroundColor={Colors.yellow} text={t('patient.report.late')} /></Box>}
            {photo.backSubmission && <Box paddingLeft="1em"><Label backgroundColor={Colors.yellow} text={t('redoPhoto.shortFlag')} /></Box>}
            <Box flexGrow="1" />
            <LoadS3Image photo={photo} style={{ display: "block" }} width="50px" />
            <Box width="1em" />
            <ChevronRight />
        </ButtonBase>
        <Box height="5px" />
    </>)
}

export default ReviewPhotos;