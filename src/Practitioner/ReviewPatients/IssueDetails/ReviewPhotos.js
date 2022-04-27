import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({

})

const ReviewPhotos = ({ patient }) => {

    const classes = useStyles();

    return (
        <>
            <Typography>Photos to Review ({patient.issues.unreviewedPhotos.length})</Typography>
            <div>
                {patient.unreviewedPhotos.map(photo => <PhotoToReview photo={photo} />)}
            </div>
        </>
    )

}

const PhotoToReview = ({ photo }) => {
    return <img style={{ display: "block" }} width="100%" src={photo.url} />
}

export default ReviewPhotos;