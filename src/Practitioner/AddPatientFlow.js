import React from 'react';
import { useTranslation } from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles'
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import TextField from '@material-ui/core/TextField'
import { Typography } from '@material-ui/core'
import SimpleButton from '../Basics/SimpleButton'

const useStyles = makeStyles({
    title: {
        fontSize: '1.5em',
        fontWeight: '600',
        marginBottom: '1em'
    },
    input: {
      margin: '2em',
    },
    container: {
        backgroundColor: "white",
        border: "1px solid gray",
        padding: "2em",
        borderRadius: "2em",
        width: "50%"
    },
    result: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }
  });

const AddPatientFlow = observer(() => {

    const { practitionerStore } = useStores();
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    const cleanInput = (e) => {
        if(e.target.value == practitionerStore.DEFAULT_PHONE){
            e.target.value = ""
        }
    }

    const handleInputs = (e) => {
        practitionerStore.newPatientInformation[e.target.id] = e.target.value;
    }

    const PatientInput = observer((props) => {

        return(
            <TextField 
            id={props.id}
            required  
            label={t(`userFields.${props.id}`)} 
            onClick={props.onClick}
            type={props.type} 
            className={classes.input} 
            onChange={handleInputs} 
            error={practitionerStore.errorReturned && practitionerStore.paramErrors[props.id] != undefined} 
            className={classes.input} 
            value={practitionerStore.newPatientInformation[props.id]} />
        )

    });

    return (

        <div className={classes.container}>
            {!practitionerStore.newPatientCode ?
            <div>
            {!practitionerStore.newPatientLoading ? 
            <div>
                <Typography className={classes.title}>Create a new patient for site</Typography>
            {practitionerStore.errorReturned ? <ListErrors errors={practitionerStore.paramErrors} /> : ""}
                <form noValidate autoComplete="off">
                    <PatientInput id="givenName" />
                    <PatientInput id="familyName" />
                    <br />
                    <Typography>Login Information</Typography>
                    <PatientInput type="tel" id="phoneNumber" onClick={cleanInput}/>
                </form>
            
            <SimpleButton onClick={practitionerStore.addNewPatient}>Generate Signup Code</SimpleButton>
            </div> : <p>Loading</p> } </div> :<CodeDisplay name={practitionerStore.newPatientInformation.givenName} code={practitionerStore.newPatientCode} />}
        </div>
        

    )

});


const ListErrors = (props) => {

    let list = Object.keys(props.errors).map( (error,index) => {
        return (<li key={error + index}>{error} : {props.errors[error][0]}</li>)
    })

    return(
        <div>
            <span>An Error Occured: </span>
        <ul>
            {list}
        </ul>
        </div>
    )
}

    


const CodeDisplay = (props) => {

    const classes = useStyles();

    return(
        <div className={classes.result}>
            <h2>Activation Code for {props.name}</h2>
            <span>{props.code}</span>
        </div>

    )

}

/*

                    <TextField error={practitionerStore.paramErrors["givenName"] != undefined} onChange={handleInputs}  required id="givenName" label={t("user_fields.given_name")} />
                    <TextField onChange={handleInputs} className={classes.input} required id="familyName" label={t("user_fields.family_name")} />
const TopLabel = styled(Typography)`
margin-bottom: 2em;
font-size: 1.5em;
`

const FormLabel = styled(Typography)`
margin: 2em 0 2em 0;

`

const Container = styled.div`

background-color: white;
border: 1px solid gray;
position: relative;
padding: 2em;

border-radius: 2em;

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

button{
    margin-top: 2em;
}


`
*/

export default AddPatientFlow;
