import React, { useState } from 'react';
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


const useStyles = makeStyles({
    title: {
        margin: 0
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
        "&.MuiFormLabel-root.Mui-focused":{
            color: Colors.textDarkGray 
        }
    }
})

const PhotoSidebar = observer(() => {
    const [expand, setExpand] = useState(false);

    const [state, setState] = useState({ medicationDetected: null, resubmissionNeeded: false });

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const item = practitionerStore.filteredPatients.photo[practitionerStore.selectedRow.index];

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

    const medicationValue = state.medicationDetected === null ? null : (state.medicationDetected ? "true" : "false");
    const showResubmissionOption = state.medicationDetected === false;

    return (
        <Basicsidebar >
            <Box padding="1em">
                <Grid alignItems='center' container>
                    <h2 className={classes.title}>{t("coordinator.sideBar.photoSub")}</h2>
                    {item.backSubmission && <>
                        <Box width=".5em" />
                        <Label backgroundColor={Colors.yellow} text={t('patient.report.late')} />
                    </>}
                </Grid>
                {item.backSubmission && <LateSubmissionInfo photoReport={item} />}
                <Box position="relative">
                    <img className={classes.photoPreview} src={item.url} />
                    <IconButton className={classes.expand} onClick={toggleExpanded}><ExpandIcon /></IconButton>
                </Box>
                <Box height="1em" />
                {expand && <ImagePopUp close={toggleExpanded} imageSrc={item.url} />}
                <FormControl component="fieldset">
                    <FormLabel foc className={classes.resultLabel} component="legend">Select Test Result</FormLabel>
                    <RadioGroup name="medicationDetected" value={medicationValue} onChange={handleDetectedChange}>
                        <Grid container direction='column'>
                            <FormControlLabel value="true" control={<Radio color='primary' />} label={<Grid container alignItems='center'><PlusIcon /><Typography>Detected</Typography></Grid>} />
                            <FormControlLabel value="false" control={<Radio color='primary' />} label={<Grid container alignItems='center'><MinusIcon /><Typography>Not Detected</Typography></Grid>} />
                        </Grid>
                    </RadioGroup>
                </FormControl>
                <Box height="1em" />
                <Fade in={showResubmissionOption}>
                    <div>
                        <FormLabel className={classes.resultLabel} component="legend">Additional Options</FormLabel>
                        <FormControlLabel
                            disabled={!showResubmissionOption}
                            control={<Checkbox color='primary' checked={state.resubmissionNeeded} onChange={handleChange} name="resubmissionNeeded" />}
                            label="Ask patient to resubmit test"
                        />
                    </div>
                </Fade>
            </Box>
        </Basicsidebar>
    )
});

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