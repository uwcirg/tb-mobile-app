import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import SideBarTop from '../Shared/SideBarHeader';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    inputBody:{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        margin: "auto"
    }
})

const AddPatient = observer(() => {

    const {practitionerStore} = useStores();
    const classes = useStyles();

    const handleExit = () => {practitionerStore.onAddPatientFlow = !practitionerStore.onAddPatientFlow }

    return(<>
        <SideBarTop handleExit={handleExit}  title="Add Patient" />
        <div className={classes.inputBody}>
            {practitionerStore.errorReturned ? "True" : "False"}
            {JSON.stringify(practitionerStore.paramErrors)}
            <PatientInput id="givenName" />
            <PatientInput id="familyName" />
            <PatientInput id="phoneNumber" />
            <button onClick={practitionerStore.addNewPatient}>Submit</button>
        </div>

    </>)

})

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