import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FlatButton from '../../../Components/FlatButton';
import useStores from '../../../Basics/UseStores';
import Styles from '../../../Basics/Styles';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../../Basics/DatePicker';
import ActivationCodePopup from '../ActivationCodePopUp';
import Colors from '../../../Basics/Colors';
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import PatientInput from './Input';
import SectionTitle from '../../../Components/Practitioner/SectionTitle';
import { IconButton } from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import WarningBox from '../../../Basics/WarningBox';
import TextCopy from '../../../Utility/Copiable';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

{/* If you want to enable creation of seed data - will allow patient histories to be created at random on server
    {(window && window._env && window._env.DOCKER_TAG != "master") && <GenerateTestDataOption />}
*/}

const AddPatient = observer(({ toggleForm }) => {

    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();
    const classes = useStyles();

    const handleExit = () => {
        toggleForm();
        practitionerStore.clearNewPatient();
    }

    return (
        <div className={classes.base}>
            <Grid container justify="space-between">
                <SectionTitle className={classes.header}>{t("coordinator.addPatientFlow.formTitle")}</SectionTitle>
                <IconButton onClick={handleExit}>
                    <Clear />
                </IconButton>
            </Grid>
            {practitionerStore.newPatient.loading && <Grid className={classes.loading} container alignItems="center" justify="center">
                <CircularProgress variant="indeterminate" />
            </Grid>}
            {practitionerStore.newPatient.code ? <ActivationCode /> : <AddPatientForm submit={practitionerStore.addNewPatient} />}
        </div>)

})

const ActivationCode = observer((props) => {
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();
    const classes = useStyles();

    return (<div>
            <Typography variant="body1">{t('coordinator.addPatientFlow.forPatient')}:</Typography>
            <div className={classes.copyContainer}>
                <TextCopy className={classes.copy} icon={<VpnKeyIcon />} text={practitionerStore.newPatient.code} />
            </div>
        </div>)
});

const AddPatientForm = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const handleDateTimeChange = (datetime) => {
        practitionerStore.newPatient.params.treatmentStart = datetime.toISO();
    }

    const displayError = practitionerStore.newPatient.errors["phoneNumber"]
    const submitDisabled = !practitionerStore.newPatient.params.givenName || !practitionerStore.newPatient.params.givenName || (practitionerStore.newPatient.params.phoneNumber.length < 5)

    return (
        <div className={classes.newPatientForm}>
            <form className={classes.inputBody} noValidate autoComplete="off">
                {displayError && <WarningBox className={classes.warning}>{t('coordinator.patientProfile.editDetails.inputError')}</WarningBox>}
                <Typography className={classes.formLabels}>{t('coordinator.patientTableLabels.name')}</Typography>
                <PatientInput id="givenName" />
                <PatientInput id="familyName" />
                <br />
                <Typography className={classes.formLabels}>{t('coordinator.patientProfile.phoneNumber')}</Typography>
                <PatientInput id="phoneNumber" />
                <Typography className={classes.formLabels}>{t('patient.userFields.treatmentStart')}</Typography>
                <div className={classes.datePicker}>
                    <DatePicker
                        inputVariant="outlined"
                        size="small"
                        InputProps={{ className: classes.input }}
                        value={practitionerStore.newPatient.params.treatmentStart}
                        onChange={handleDateTimeChange}
                        disableFuture
                    />
                </div>
            </form>
            <Grid className={classes.formBottom} container alignItems="center" justify="flex-end">
                {submitDisabled && <Typography style={{ maxWidth: "50%", marginRight: "auto" }}>{t('commonWords.fillAll')} *</Typography>}
                <FlatButton disabled={submitDisabled} className={classes.submit} onClick={props.submit}>{t('coordinator.patientProfile.editDetails.submit')}</FlatButton>
            </Grid>
        </div>
    )
})

const useStyles = makeStyles({
    copyContainer: {
        padding: "1em 0",
        width: "60%",
        "& > div > div": {
            backgroundColor: "white"
        }
    },
    header: {
        padding: ".5em 0",
    },
    formLabels: {
        ...Styles.header,
        marginTop: "1em",
        marginBottom: ".5em",
        fontSize: "1em",
        "&:first-of-type": {
            marginTop: ".5em"
        }
    },
    input: {
        "& input": {
            backgroundColor: "white",
            borderRadius: "4px"
        }
    },
    newPatientForm: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
    },
    submit: {
        fontSize: "1em"
    },
    base: {
        position: "relative",
        backgroundColor: Colors.lighterGray,
        borderRadius: "4px",
        padding: "1em",
        margin: "1em 0",
        width: "500px",
    },
    inputBody: {
        borderBottom: `1px solid ${Colors.lightgray}`,
        borderTop: `1px solid ${Colors.lightgray}`,
        paddingBottom: "1em",
        "& .MuiInputBase-root": {
            marginRight: "1em"
        }
    },
    formBottom: {
        marginTop: "2em",
        marginBottom: ".5em"
    },
    loading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        boxSizing: "border-box",
        backgroundColor: Colors.lighterGray,
        zIndex: 5
    },
    warning: {
        padding: "1em",
        margin: "1em 0",
        borderRadius: "4px",
        border: "none",
        backgroundColor: Colors.calendarRed
    }
})

export default AddPatient;