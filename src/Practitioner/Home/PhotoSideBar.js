import React, { useState } from 'react'
import Basicsidebar from '../Shared/Sidebar'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ImagePopUp from '../Shared/ImagePopUp';
import ExpandIcon from '@material-ui/icons/AspectRatio';
import Label from '../../Components/Label';
import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import { DATETIME_MED_NO_YEAR } from '../../Utility/TimeUtils';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({

    photoPreview:{
        height: "300px",
        width: "100%",
        objectFit: "contain"
    },
    photoContainer: {
        padding: ".5em",
        "& > h2": {
            fontSize: "1em",
            width: "90%"
        }
    },
    buttonContainer: {
        marginTop: "2em",
        width: "100%",
        margin: "auto",
        ...Styles.flexRow,
        justifyContent: "space-evenly"
    },
    expand: {
        padding: ".5em",
        color: Colors.buttonBlue
    },
    lateArea: {
        width: "100%",
        boxSizing: "border-box"
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

    return (
        <Basicsidebar >
            <div className={classes.photoContainer} >
                <Grid alignItems='center' container><h2>{t("coordinator.sideBar.photoSub")}</h2>
                    {item.backSubmission && <>
                    <Box width=".5em" />
                    <Label backgroundColor={Colors.yellow} text={t('patient.report.late')} /> 
                    </>}
                </Grid>
                {item.backSubmission && <LateSubmissionInfo photoReport={item} />}
                <div>
                    <img className={classes.photoPreview} src={item.url} />
                    <IconButton className={classes.expand} onClick={toggleExpanded}><ExpandIcon /></IconButton>
                </div>
                {expand && <ImagePopUp close={toggleExpanded} imageSrc={item.url} />}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Test Result</FormLabel>
                    <RadioGroup name="medicationDetected" value={medicationValue} onChange={handleDetectedChange}>
                        <FormControlLabel value="true" control={<Radio color='primary' />} label="Detected" />
                        <FormControlLabel value="false" control={<Radio color='primary' />} label="Not Detected" />
                    </RadioGroup>
                </FormControl>
                <br />
                <FormControlLabel
                    disabled={state.medicationDetected !== false}
                    control={<Checkbox color='primary' checked={state.resubmissionNeeded} onChange={handleChange} name="resubmissionNeeded" />}
                    label="Ask patient to resubmit"
                />
            </div>
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
            <Typography><strong>{t('dashboard.requested')}:</strong> {requestDate}</Typography>
            <Typography><strong>{t('dashboard.submitted')}:</strong> {submittedDatetime}</Typography>
        </div>
    )

}


export default PhotoSidebar;