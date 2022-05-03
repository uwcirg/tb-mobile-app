import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Dialog, Grid, Fade } from '@material-ui/core';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const useStyles = makeStyles({
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
        backgroundColor: 'rgb(0,0,0,.8)'
    },
    popoverContent: {
        color: "white"
    }
})

const ReviewPhotoPopOver = observer(({ unreviewedPhotos }) => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const photoId = new URLSearchParams(uiStore.urlSearchParams).get("review-photo")

    const selectedPhoto = photoId ? unreviewedPhotos.find(each => { return each.photoId === parseInt(photoId) }) : false;

    return (<Dialog
        TransitionComponent={Fade}
        classes={{ paper: classes.popover, root: classes.backdrop }}
        open={!!selectedPhoto}>
        {selectedPhoto && <div className={classes.popoverContent}>
            <Button style={{ color: "white" }} onClick={uiStore.goBack}> Exit</Button>
            <PanImage url={selectedPhoto.url} />
            <Box paddingTop="1em">
                <Grid container>
                    <Button variant="contained" style={{ backgroundColor: "white" }}>Detected</Button>
                    <Box width=".5em" />
                    <Button variant="contained" style={{ backgroundColor: "white" }}>Undetected</Button>
                </Grid>
            </Box>

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

export default ReviewPhotoPopOver;