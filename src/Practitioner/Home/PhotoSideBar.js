import React, { useEffect, useState } from 'react';
import Basicsidebar from '../Shared/Sidebar';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ImagePopUp from '../Shared/ImagePopUp';
import ExpandIcon from '@material-ui/icons/AspectRatio';
import Label from '../../Components/Label';
import { Box, Checkbox, Fade, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { DATETIME_MED_NO_YEAR } from '../../Utility/TimeUtils';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import MinusIcon from '@material-ui/icons/IndeterminateCheckBox';
import PlusIcon from '@material-ui/icons/AddBox';
import FlatButton from '../../Components/FlatButton';
import { KeyboardArrowRight } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField'


const useStyles = makeStyles({
    title: {
        margin: 0
    },
    titleContainer: {
        width: "100%",
    },
    photoPreview: {
        maxHeight: "400px",
        width: "100%",
        objectFit: "contain"
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    },
    expand: {
        padding: "5px",
        color: Colors.buttonBlue,
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        right: 0,
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "white"
        }
    },
    lateArea: {
        width: "100%",
        boxSizing: "border-box"
    },
    resultLabel: {
        color: Colors.textDarkGray,
        "&.MuiFormLabel-root.Mui-focused": {
            color: Colors.textDarkGray
        }
    },
    submitButtonContainer: {
        width: "100%",
        padding: "0 1em"
    }
})

const PhotoSidebar = observer(() => {
    const [expand, setExpand] = useState(false);

    const [state, setState] = useState({ approved: null, redoFlag: false, redoReason: "" });

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const item = practitionerStore.filteredPatients.photo[practitionerStore.selectedRow.index];

    useEffect(()=>{
        resetState();
    },[practitionerStore.selectedRow.index])

    const toggleExpanded = () => { setExpand(!expand) }

    const handleChange = (e) => {
        let newState = { ...state };
        newState[e.target.name] = e.target.checked;
        setState({ ...newState })
    }

    const handleDetectedChange = (e) => {
        let newState = { ...state };
        newState[e.target.name] = e.target.value === "true";
        setState({ ...newState })
    }

    const resetState = () => {
        setState({ approved: null, redoFlag: false, redoReason: "" })
    }

    const medicationValue = state.approved === null ? null : (state.approved ? "true" : "false");
    const showResubmissionOption = state.approved === false && !item.isRedo;
    const enableSubmit = state.approved !== null;

    return (
        <Basicsidebar buttons={<SubmitButon resetState={resetState} photoReport={item} enabled={enableSubmit} reviewState={state} />}>
            <Box padding="1em">
                <Grid alignItems='center' container className={classes.titleContainer}>
                    <h2 className={classes.title}>{t("coordinator.sideBar.photoSub")}</h2>
                    <Box flexGrow="1" />
                    {item.backSubmission && <Label backgroundColor={Colors.warningRed} text={item.isRedo ? t('redoPhoto.flag') : t('patient.report.late')} />}
                </Grid>
                {item.backSubmission && <LateSubmissionInfo photoReport={item} />}
                <Box position="relative">
                    <img className={classes.photoPreview} src={item.url} />
                    <IconButton className={classes.expand} onClick={toggleExpanded}><ExpandIcon /></IconButton>
                </Box>
                <Box height="1em" />
                {expand && <ImagePopUp close={toggleExpanded} imageSrc={item.url} />}
                <FormControl component="fieldset">
                    <FormLabel  className={classes.resultLabel} component="legend">{t('redoPhoto.selectResult')}</FormLabel>
                    <RadioGroup name="approved" value={medicationValue} onChange={handleDetectedChange}>
                        <Grid container direction='column'>
                            <FormControlLabel value="true" control={<Radio color='primary' />} label={<Grid container alignItems='center'><PlusIcon /><Typography>{t('redoPhoto.detected')}</Typography></Grid>} />
                            <FormControlLabel value="false" control={<Radio color='primary' />} label={<Grid container alignItems='center'><MinusIcon /><Typography>{t('redoPhoto.notDetected')}</Typography></Grid>} />
                        </Grid>
                    </RadioGroup>
                </FormControl>
                <Box height="1em" />
                <Fade in={showResubmissionOption}>
                    <div>
                        <FormControlLabel
                            disabled={!showResubmissionOption}
                            control={<Checkbox color='primary' checked={state.redoFlag} onChange={handleChange} name="redoFlag" />}
                            label={t('redoPhoto.ask')}
                        />
                    </div>
                </Fade>
                <Box height="1em" />
                <Fade in={state.redoFlag}>
                    <div>
                        <FormLabel className={classes.resultLabel} component="legend">{t('redoPhoto.attachMessage')}</FormLabel>
                        <Box height=".5em" />
                        <TextField variant="outlined" fullWidth onChange={(e) => { setState({ ...state, redoReason: e.target.value }) }} value={state.redoReason} multiline rows={2} />
                    </div>
                </Fade>
            </Box>
        </Basicsidebar>
    )
});

const SubmitButon = ({ enabled, reviewState, photoReport, resetState }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore, uiStore } = useStores();

    const handleSubmit = () => {
        practitionerStore.processPhoto(photoReport.photoId, reviewState).then((res) => {
            if(!res.photoId){
                uiStore.setAlert("Error updating photo report. Please try again", "error" )
                return
            }
            practitionerStore.adjustIndex();
            practitionerStore.getPhotoReports();
            resetState();
        })
    }

    return (<Grid className={classes.submitButtonContainer} justify="flex-end" container>
        <FlatButton onClick={handleSubmit} disabled={!enabled}>
            <Typography style={{ lineHeight: "1" }}>{t('coordinator.patientProfile.editDetails.submit')}</Typography>
            <KeyboardArrowRight style={{ padding: 0 }} />
        </FlatButton>
    </Grid>)
}

const LateSubmissionInfo = ({ photoReport }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const requestDate = DateTime.fromISO(photoReport.date).toLocaleString(DATETIME_MED_NO_YEAR)
    const submittedDatetime = DateTime.fromISO(photoReport.createdAt).toLocaleString(DATETIME_MED_NO_YEAR)

    return (
        <div className={classes.lateArea}>
            <Typography>{t('dashboard.requested')}: {requestDate}</Typography>
            <Typography>{t('dashboard.submitted')}: {submittedDatetime}</Typography>
        </div>
    )

}


export default PhotoSidebar;