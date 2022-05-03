import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Box, Button, Dialog, Grid, Fade, IconButton, FormControl, FormLabel,
    RadioGroup, FormControlLabel, Radio, Typography, Checkbox, TextField, Modal
} from '@material-ui/core';
// import { Plus, Minus } from '@material-ui/icons'
import Minus from '@material-ui/icons/IndeterminateCheckBox';
import Plus from '@material-ui/icons/AddBox';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { Clear } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';

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
        backgroundColor: 'white'
    },
    popoverContent: {
    },
    exitButton: {
        paddingLeft: "0"
    }
})

const ReviewPhotoPopOver = observer(({ unreviewedPhotos }) => {

    const classes = useStyles();
    const { uiStore } = useStores();
    const photoId = new URLSearchParams(uiStore.urlSearchParams).get("review-photo")

    const selectedPhoto = photoId ? unreviewedPhotos.find(each => { return each.photoId === parseInt(photoId) }) : false;

    return (
        <>
            {selectedPhoto && <Modal
                BackdropProps={{ style: { backgroundColor: "white" } }}
                open={!!selectedPhoto}

            >
                <div>
                    <Grid container alignItems='center' wrap="nowrap">
                        <Box padding="1em">
                            <Typography>Review Photo</Typography>
                        </Box>
                        <Box flexGrow="1" />
                        <IconButton className={classes.exitButton} onClick={uiStore.goBack}>
                            <Clear />
                        </IconButton>
                    </Grid>
                    <Box padding="1em" className={classes.popoverContent}>
                        <PanImage url={selectedPhoto.url} />
                        <Box paddingTop="1em">
                            <Grid container>
                                <Buttons />
                            </Grid>
                        </Box>

                    </Box>
                </div>
            </Modal>}
        </>
    )

});

const PanImage = ({ url }) => {

    return (

        <TransformWrapper
            initialScale={0.4}
            minScale={0.4}
            centerOnInit>
            <TransformComponent wrapperStyle={{ backgroundColor: "white", border: "solid 1px lightgray", borderRadius: "4px", width: "100%", maxHeight: "50vh" }}>
                <Fade appear in timeout={1000}>
                    <img src={url} alt="test-strip-image-to-review" />
                </Fade>
            </TransformComponent>
        </TransformWrapper>
    )
}

const Buttons = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const [state, setState] = useState({ approved: null, redoFlag: false, redoReason: "" });

    const handleChange = (e) => {
        let tempState = { ...state };
        tempState[e.target.name] = e.target.name === "redoFlag" ? e.target.checked : e.target.value;
        setState(tempState);
    }

    // const medicationValue = state.approved === null ? null : (state.approved ? "true" : "false");
    const showResubmissionOption = state.approved === "false"
    const enableSubmit = state.approved !== null;


    //const handleChange = (e) => { setState({ ...state, redoReason: e.target.value }) }

    return (
        <>
            <FormControl component="fieldset">
                <FormLabel className={classes.resultLabel} component="legend">{t('redoPhoto.selectResult')}</FormLabel>
                <RadioGroup name="approved" value={state.approved} onChange={handleChange}>
                    <Grid container direction='column'>
                        <FormControlLabel value="true" control={<Radio color='primary' />} label={<Grid container alignItems='center'><Plus /><Typography>{t('redoPhoto.detected')}</Typography></Grid>} />
                        <FormControlLabel value="false" control={<Radio color='primary' />} label={<Grid container alignItems='center'><Minus /><Typography>{t('redoPhoto.notDetected')}</Typography></Grid>} />
                    </Grid>
                </RadioGroup>
            </FormControl>
            <Box height="1em" />
            <Fade in={showResubmissionOption}>
                <div>
                    <FormControlLabel
                        disabled={!showResubmissionOption}
                        control={<Checkbox color='primary' checked={state.redoFlag} onChange={handleChange}
                            name="redoFlag" />}
                        label={t('redoPhoto.ask')} />
                </div>
            </Fade>
            <Box height="1em" />
            <Fade in={state.redoFlag}>
                <div>
                    <FormLabel className={classes.resultLabel} component="legend">{t('redoPhoto.attachMessage')}</FormLabel>
                    <Box height=".5em" />
                    <TextField name="redoReason" variant="outlined" fullWidth onChange={handleChange} value={state.redoReason} multiline rows={2} />
                </div>
            </Fade>
        </>
    )
}

export default ReviewPhotoPopOver;