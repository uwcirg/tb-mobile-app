import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import SideBarTop from '../Shared/SideBarHeader';
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import SimpleButton from '../../Basics/MuiButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Shared/Loading';
import DatePicker from '../../Basics/DatePicker';
import ActivationCodePopup from './ActivationCodePopUp';

const useStyles = makeStyles({

    base: {
        padding: "1em"
    },
    inputBody: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto"
    },
    input: {
        marginTop: "1em",
        marginBottom: "1em",
        width: "100%"
    },
    newPatientForm: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
    },
    submit: {
        margin: "1em 1em 0 auto",

    },
    checkbox: {
        marginTop: "2em",
        "& > span": {
            fontSize: ".75em"
        }

    },
    datePicker: {
        "& > div": {
            width: "100%",
        },

        margin: "1em 0 1em 0"
    }
})

const AddPatient = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const handleExit = () => {
        practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow
        practitionerStore.clearNewPatient();
    }
    const { t } = useTranslation('translation');

    return (
        <div className={classes.base}>
            <ActivationCodePopup activationCode={practitionerStore.newPatient.code} close={practitionerStore.clearNewPatient} />
            {practitionerStore.newPatient.code ? <p>{practitionerStore.newPatient.code}</p> :
                <>
                    <SideBarTop handleExit={handleExit} title={t('coordinator.addPatientFlow.title')} />
                    {practitionerStore.newPatient.loading ? <Loading /> : <AddPatientForm submit={practitionerStore.addNewPatient} />}
                </>}
        </div>)

})

const AddPatientForm = observer((props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const handleDateTimeChange = (datetime) => {
        practitionerStore.newPatient.params.treatmentStart = datetime.toISO();
    }

    return (
        <div className={classes.newPatientForm}>
            {practitionerStore.newPatient.errors["phoneNumber"] && practitionerStore.newPatient.errors["phoneNumber"].includes("has already been taken") &&
                <p>Phone number must be unique</p>}
            <form className={classes.inputBody} noValidate autoComplete="off">
                <PatientInput id="givenName" />
                <PatientInput id="familyName" />
                <PatientInput id="phoneNumber" />
                <div className={classes.datePicker}>
                    <DatePicker
                        className={classes.datePicker}
                        value={practitionerStore.newPatient.params.treatmentStart}
                        label={t('patient.userFields.treatmentStart')}
                        onChange={handleDateTimeChange}
                        disableFuture
                    />
                </div>
                {(window && window._env && window._env.DOCKER_TAG != "master") && <UsabilityTestQuestion />}
            </form>
            <SimpleButton className={classes.submit} onClick={props.submit}>{t('coordinator.addPatientFlow.title')}</SimpleButton>
        </div>
    )
})

const UsabilityTestQuestion = observer(() => {
    const { practitionerStore } = useStores();
    const classes = useStyles();
    return (
        <FormControlLabel
            control={<Checkbox color="primary" checked={practitionerStore.newPatient.params.isTester} onChange={() => { practitionerStore.newPatient.params.isTester = !practitionerStore.newPatient.params.isTester }} name="checkedA" />}
            className={classes.checkbox}
            label="Generate Random Treatment History (For Testing)"
        />
    )

})

const PatientInput = observer((props) => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const { practitionerStore } = useStores();

    const handleInputs = (e) => {
        practitionerStore.newPatient.params[e.target.id] = e.target.value;
    }

    return (
        <TextField
            id={props.id}
            required
            label={t(`patient.userFields.${props.id}`)}
            onClick={props.onClick}
            type={props.type}
            className={classes.input}
            onChange={handleInputs}
            error={practitionerStore.newPatient.errorReturned && practitionerStore.newPatient.errors[props.id] != undefined}
            className={classes.input}
            value={practitionerStore.newPatient.params[props.id]} />
    )

});

export default AddPatient;