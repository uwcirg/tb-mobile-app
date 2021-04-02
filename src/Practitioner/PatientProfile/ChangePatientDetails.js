import React, { useEffect } from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import MuiButton from '../../Basics/MuiButton';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import { InputLabel, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Colors from '../../Basics/Colors';
import EditableField from '../Shared/EditableField'

const useStyles = makeStyles({
    textInput: {
        "& > div > input": {
            padding: "10px"
        }
    },
    inputs: {
        width: "70%",
    },
    label: {
        display: "block",
        marginBottom: "5px"
    },

    popOverBody: {
        marginBottom: "1em"
    },
    formControl: {
        marginTop: "2em",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        "& > button": {
            margin: "0 .25em",
            color: "white"
        },
        "& > button > span": {
            textTransform: "capitalize"
        },
        "& > #cancel": {
            backgroundColor: Colors.warningRed
        },
        "& > #submit": {
            backgroundColor: Colors.buttonBlue
        }
    },
    inputItem: {
        margin: ".5em 0"
    }
})

const ChangePatientDetails = observer(() => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientProfileStore, practitionerStore } = useStores();

    useEffect(() => {
        patientProfileStore.givenName = practitionerStore.selectedPatient.details.givenName;
        patientProfileStore.familyName = practitionerStore.selectedPatient.details.familyName;
        patientProfileStore.phoneNumber = practitionerStore.selectedPatient.details.phoneNumber;

    }, [practitionerStore.selectedPatient.details])

    return (
        <PopOver close={patientProfileStore.toggleOnChangeDetails} title={"Edit Patient Details"}>
            <form className={classes.form}>
                <p>
                    {t('coordinator.patientProfile.editDetails.warning')}
                </p>
                <div className={classes.inputs}>
                    <InputItem
                        labelText={"Phone Number"}
                        value={patientProfileStore.phoneNumber}
                        id="phone-number"

                    />
                    <InputItem
                        labelText={"First Name"}
                        value={patientProfileStore.givenName}
                        id="first-name"

                    />
                    <InputItem
                        labelText={"Last Name"}
                        value={patientProfileStore.familyName}
                        id="last-name"

                    />
                </div>
                <div className={classes.formControl}>
                    <Button disableElevation id="cancel" variant="contained" >Cancel</Button>
                    <Button disableElevation id="submit" variant="contained" >Submit</Button>
                </div>

            </form>
        </PopOver>)
});

const InputItem = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.inputItem}>
            <label className={classes.label} for={props.id}>{props.labelText}</label>
            <TextField
                className={classes.textInput}
                id={props.id}
                variant="outlined"
                value={props.value}
                fullWidth
            />
        </div>
    )
}

export default ChangePatientDetails;
