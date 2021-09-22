import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../../Shared/Loading';
import DatePicker from '../../../Basics/DatePicker';
import ActivationCodePopup from '../ActivationCodePopUp';
import SectionTitle from '../../../Components/Practitioner/SectionTitle';
import Colors from '../../../Basics/Colors';
import FlatButton from '../../../Components/FlatButton';
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    formLabels: {
        marginTop: "1em",
        marginBottom: ".5em",
        fontSize: "1em",
        "&:first-of-type": {
            marginTop: 0
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
    inputBody: {
        backgroundColor: Colors.lighterGray,
        borderRadius: "4px",
        padding: "1em",
        margin: "1em 0",
        width: "fit-content",
        "& > div": {
            marginRight: "1em"
        }
    },
    formBottom: {
        marginTop: "2em",
        marginBottom: ".5em"
    }
})

const AddPatient = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    
    const { t } = useTranslation('translation');

    return (
        <div className={classes.base}>
            <ActivationCodePopup activationCode={practitionerStore.newPatient.code} close={practitionerStore.clearNewPatient} />
            {practitionerStore.newPatient.code ? <p>{practitionerStore.newPatient.code}</p> :
                <>
                    <SectionTitle>{t('coordinator.addPatientFlow.title')}</SectionTitle>
                    {practitionerStore.newPatient.loading ? <Loading /> : <AddPatientForm submit={practitionerStore.addNewPatient} />}
                </>}
        </div>)

})

const AddPatientForm = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const handleDateTimeChange = (datetime) => {
        practitionerStore.newPatient.params.treatmentStart = datetime.toISO();
    }

    const submitDisabled = !practitionerStore.newPatient.params.givenName || !practitionerStore.newPatient.params.givenName || (practitionerStore.newPatient.params.phoneNumber.length < 5)

    return (
        <div className={classes.newPatientForm}>
            {practitionerStore.newPatient.errors["phoneNumber"] && practitionerStore.newPatient.errors["phoneNumber"].includes("has already been taken") &&
                <p>{t('coordinator.patientProfile.editDetails.inputError')}</p>}
            <form className={classes.inputBody} noValidate autoComplete="off">
                <SectionTitle className={classes.formLabels}>{t('coordinator.patientTableLabels.name')}</SectionTitle>
                <PatientInput id="givenName" />
                <PatientInput id="familyName" />
                <br />
                <SectionTitle className={classes.formLabels}>{t('coordinator.patientProfile.phoneNumber')}</SectionTitle>
                <PatientInput id="phoneNumber" />
                <SectionTitle className={classes.formLabels}>{t('patient.userFields.treatmentStart')}</SectionTitle>
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
                {/* If you want to enable creation of seed data {(window && window._env && window._env.DOCKER_TAG != "master") && <GenerateTestDataOption />} */}
                <Grid className={classes.formBottom} container alignItems="center" justify="space-between">
                    {submitDisabled && <Typography style={{maxWidth: "50%"}}>{t('commonWords.fillAll')} *</Typography>}
                    <FlatButton disabled={submitDisabled} className={classes.submit} onClick={props.submit}>{t('coordinator.patientProfile.editDetails.submit')}</FlatButton>
                </Grid>
            </form>
        </div>
    )
})

const PatientInput = observer((props) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore } = useStores();

    const handleInputs = (e) => {
        practitionerStore.newPatient.params[e.target.id] = e.target.value;
    }

    return (
        <TextField
            size="small"
            variant="outlined"
            id={props.id}
            label={t(`patient.userFields.${props.id}`)}
            onClick={props.onClick}
            type={props.type}
            onChange={handleInputs}
            error={practitionerStore.newPatient.errorReturned && practitionerStore.newPatient.errors[props.id] != undefined}
            className={classes.input}
            value={practitionerStore.newPatient.params[props.id]} />
    )

});

export default AddPatient;