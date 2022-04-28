import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, ButtonBase, Dialog, Grid, Typography, Popover, Fade, Backdrop } from '@material-ui/core';
import { DateTime } from 'luxon';
import { ChevronRight } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

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
    popover: {
        boxSizing: "border-box",
        margin: ".5em",
        width: "100vw",
        maxWidth: "100vw",
        height: "100vh",
        borderRadius: "0",
        backgroundColor: "unset",
        boxShadow: "none"
    },
    backdrop: {
        zIndex: 10,
        color: 'rgb(0,0,0)',
        opacity: '90%'
    },
})

const ReviewPhotos = ({ patient }) => {

    const classes = useStyles();

    return (
        <>
            <PhotoPopOver unreviewedPhotos={patient.unreviewedPhotos} />
            <Typography>Photos to Review ({patient.issues.unreviewedPhotos.length})</Typography>
            <Typography>Click to launch review</Typography>
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

const PhotoPopOver = observer(({ unreviewedPhotos }) => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const photoId = new URLSearchParams(uiStore.urlSearchParams).get("review-photo")

    const selectedPhoto = photoId ? unreviewedPhotos.find(each => { return each.photoId === parseInt(photoId) }) : false;

    return (<Dialog
        TransitionComponent={Fade}
        classes={{ paper: classes.popover, root: classes.pr }}
        open={!!selectedPhoto}>
        {selectedPhoto && <div>
            <Button style={{ color: "white" }} onClick={uiStore.goBack}> Exit</Button>
            <PanImage url={selectedPhoto.url} />
        </div>}
    </Dialog>)

});

const PanImage = ({ url }) => {
    return (<TransformWrapper
        initialScale={0.4}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.4}
        centerOnInit>
        <TransformComponent wrapperStyle={{ backgroundColor: "white", width: "100%", maxHeight: "50vh" }}>
            <img src={url} alt="test-strip-image-to-review" />
        </TransformComponent>
    </TransformWrapper>)
}

export default ReviewPhotos;