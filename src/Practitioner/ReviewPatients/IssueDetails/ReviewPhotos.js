import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Grid, Typography, Avatar} from '@material-ui/core';
import { DateTime } from 'luxon';
import { CameraAlt, ChevronRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Colors from '../../../Basics/Colors';
import ReviewPhotoPopOver from '../../Shared/ReviewPhotoPopOver';

const useStyles = makeStyles({
    photoReport: {
        boxSizing: "border-box",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: ".5em",
        width: "100%",
        border: "solid 1px lightgray",
        borderRadius: "4px"
    },
    avatar: {
        fontSize: ".75em",
        width: "1.5em",
        height: "1.5em",
        backgroundColor: Colors.buttonBlue
    },
    icon:{
        color: Colors.textGray
    }
})

const ReviewPhotos = ({ patient }) => {

    const classes = useStyles();

    return (
        <>
            <ReviewPhotoPopOver unreviewedPhotos={patient.unreviewedPhotos} />
            <Grid wrap="nowrap" alignItems="center" container>
                <CameraAlt className={classes.icon} />
                <Box padding="0 .5em">
                    <Typography>Photos to review</Typography>
                </Box>
                <Avatar className={classes.avatar} >{patient.issues.unreviewedPhotos.length}</Avatar>
            </Grid>
            <Box height=".5em" />
            <div>
                {patient.unreviewedPhotos.map(photo => <PhotoToReview key={`photo-to-review-${photo.photoId}`} photo={photo} />)}
            </div>
        </>
    )
}

const PhotoToReview = ({ photo }) => {
    const classes = useStyles();

    return (<>
        <ButtonBase disableTouchRipple component={Link} to={`?review-photo=${photo.photoId}`} className={classes.photoReport}>
            <Typography>{DateTime.fromISO(photo.createdAt).toLocaleString({ day: "numeric", month: "numeric" })}</Typography>
            <Box width="1em" />
            <img style={{ display: "block" }} width="50px" src={photo.url} />
            <Box flexGrow="1" />
            <ChevronRight />
        </ButtonBase>
        <Box height="5px" />
    </>)
}

export default ReviewPhotos;