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
    const { patientProfileStore } = useStores();

    useEffect(() => {
        patientProfileStore.initalizeChanges();
    }, [patientProfileStore.selectedPatient.details])

    return (
        <PopOver close={patientProfileStore.toggleOnChangeDetails} title={"Edit Patient Details"}>
            <form className={classes.form}>
                <p>
                    {t('coordinator.patientProfile.editDetails.warning')}
                </p>
                <div className={classes.inputs}>
                    <InputItem
                        labelText={"Phone Number"}
                        value={patientProfileStore.changes.phoneNumber}
                        id="phoneNumber"

                    />
                    <InputItem
                        labelText={"First Name"}
                        value={patientProfileStore.changes.givenName}
                        id="givenName"

                    />
                    <InputItem
                        labelText={"Last Name"}
                        value={patientProfileStore.changes.familyName}
                        id="familyName"

                    />
                </div>
                <div className={classes.formControl}>
                    <Button disableElevation onClick={patientProfileStore.toggleOnChangeDetails} id="cancel" variant="contained" >Cancel</Button>
                    <Button disabled={!patientProfileStore.hasChanges} onClick={patientProfileStore.postPatientChanges} disableElevation id="submit" variant="contained" >Submit</Button>
                </div>

            </form>
        </PopOver>)
});

const InputItem = (props) => {
    const classes = useStyles();
    const { patientProfileStore } = useStores();

    return (
        <div className={classes.inputItem}>
            <label className={classes.label} for={props.id}>{props.labelText}</label>
            <TextField
                className={classes.textInput}
                id={props.id}
                variant="outlined"
                value={props.value}
                fullWidth
                onChange={e => {
                    patientProfileStore.changes[props.id] = e.target.value;
                }}
            />
        </div>
    )
}

export default ChangePatientDetails;
