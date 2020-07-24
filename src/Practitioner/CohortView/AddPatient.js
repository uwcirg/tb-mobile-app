import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import SideBarTop from '../Shared/SideBarHeader';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import SimpleButton from '../../Basics/SimpleButton';
import PopOver from '../Shared/PopOver'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loading from '../Shared/Loading'

const useStyles = makeStyles({
    inputBody: {
        display: "flex",
        flexDirection: "column",
        width: "80%",
        margin: "auto"
    },
    input: {
        marginTop: "1em",
        width: "100%"
    },
    newPatientForm: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
    },
    submit: {
        margin: "auto",
        marginTop: "2em"
    },
    checkbox:{
        marginTop: "2em",
    }
})

const AddPatient = observer(() => {

    const { practitionerStore } = useStores();
    const classes = useStyles();
    const handleExit = () => { 
        practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow 
        practitionerStore.clearNewPatient();
    }

    return (<>
        {practitionerStore.newPatient.code && <PopOver title={"Patient Added"} close={practitionerStore.clearNewPatient}><p>Code to send to patient:</p> <p>{practitionerStore.newPatient.code}</p> </PopOver>}
        {practitionerStore.newPatient.code ? <p>{practitionerStore.newPatient.code}</p> :
            <>
                <SideBarTop handleExit={handleExit} title="Add Patient" />
                {practitionerStore.newPatient.loading ? <Loading /> : <AddPatientForm submit={practitionerStore.addNewPatient} />}
            </>}
    </>)

})

const AddPatientForm = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.newPatientForm}>
            <form className={classes.inputBody} noValidate autoComplete="off">
                <PatientInput id="givenName" />
                <PatientInput id="familyName" />
                <PatientInput id="phoneNumber" />
                <UsabilityTestQuestion />
            </form>
            <SimpleButton className={classes.submit} onClick={props.submit}>Submit</SimpleButton>
        </div>
    )
}

const UsabilityTestQuestion = observer(() => {
    const { practitionerStore } = useStores();
    const classes = useStyles();
    return(
        <FormControlLabel
        control={<Checkbox color="primary" checked={practitionerStore.newPatient.params.isTester} onChange={()=>{practitionerStore.newPatient.params.isTester = !practitionerStore.newPatient.params.isTester }} name="checkedA" />}
        className={classes.checkbox}
        label="Usability Testing Patient"
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