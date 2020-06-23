import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import SideBarTop from '../Shared/SideBarHeader';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import SimpleButton from '../../Basics/SimpleButton';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    inputBody:{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto"
    },
    input: {
        marginTop: "1em"
    },
    newPatientForm:{
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
    },
    submit:{
        margin: "auto",
        marginTop: "2em"
    },
    loading:{
        width: "100%",
        display: "flex",
        justifyContent: "center"
    }
})

const AddPatient = observer(() => {

    const {practitionerStore} = useStores();
    const classes = useStyles();
    const handleExit = () => {practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow }


    return(<>
        <SideBarTop handleExit={handleExit}  title="Add Patient" />
        {practitionerStore.newPatientLoading ? <div className={classes.loading}><CircularProgress size="25%" /> </div>: <AddPatientForm submit={practitionerStore.addNewPatient} />}
        {practitionerStore.newPatientCode && <p>{practitionerStore.newPatientCode}</p>}
    </>)

})

const AddPatientForm = (props) => {
    const classes = useStyles();
    return(
        <div className={classes.newPatientForm}>
        <form className={classes.inputBody} noValidate autoComplete="off">
            <PatientInput id="givenName" />
            <PatientInput id="familyName" />
            <PatientInput id="phoneNumber" />
        </form>
        <SimpleButton className={classes.submit} onClick={props.submit}>Submit</SimpleButton>
        </div>
    )
}

const PatientInput = observer((props) => {

    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();
    const {practitionerStore} = useStores();

    const handleInputs = (e) => {
        practitionerStore.newPatientInformation[e.target.id] = e.target.value;
    }

    return(
        <TextField 
        id={props.id}
        required  
        label={t(`patient.userFields.${props.id}`)} 
        onClick={props.onClick}
        type={props.type} 
        className={classes.input} 
        onChange={handleInputs} 
        error={practitionerStore.errorReturned && practitionerStore.paramErrors[props.id] != undefined} 
        className={classes.input} 
        value={practitionerStore.newPatientInformation[props.id]} />
    )

});

export default AddPatient;