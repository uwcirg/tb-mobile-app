import React, { useEffect } from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import MuiButton from '../../Basics/MuiButton';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({

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
    }
})

const ChangePatientDetails = observer(() => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientProfileStore, practitionerStore } = useStores();

    useEffect(()=>{
        patientProfileStore.givenName = practitionerStore.selectedPatient.details.givenName;
        patientProfileStore.familyName = practitionerStore.selectedPatient.details.familyName;
    },[practitionerStore.selectedPatient.details])

    return (
        <PopOver close={patientProfileStore.toggleOnChangeDetails} title={"Edit Patient Details"}>
            <form className={classes.form}>
                <p>
                    {t('coordinator.patientProfile.editDetails.warning')}
                </p>
                <TextField
                    label={t('coordinator.patientProfile.editDetails.newPhone')}
                    placeholder="123456789"
                    fullWidth
                ></TextField>
                <TextField
                    label={t('patient.userFields.firstName')}
                    value={patientProfileStore.givenName}
                    onChange={(e) => {patientProfileStore.setGivenName(e.target.value)}}
                    fullWidth
                ></TextField>
                <TextField
                    label={t('patient.userFields.lastName')}
                    value={patientProfileStore.familyName}
                    onChange={(e) => {patientProfileStore.setFamilyName(e.target.value)}}
                    fullWidth
                ></TextField>
                <div className={classes.formControl}>
                    <Button disableElevation id="cancel" variant="contained" >Cancel</Button>
                    <Button disableElevation id="submit" variant="contained" >Submit</Button>
                </div>

            </form>
        </PopOver>)
});

export default ChangePatientDetails;
