import React, { useEffect } from 'react'
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import PopOver from '../Shared/PopOver';
import makeStyles from '@material-ui/styles/makeStyles'
import TextField from '@material-ui/core/TextField'
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Colors from '../../Basics/Colors';
import WarningBox from '../../Basics/WarningBox';
import DatePicker from '../../Basics/DatePicker';

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
            backgroundColor: Colors.buttonBlue,
            "&:disabled":{
                backgroundColor: "lightgray"
            }
            
        }
    },
    inputItem: {
        margin: ".5em 0"
    },
    warning: {
        marginTop: ".5em"
    },
    calendarInput:{
        "& > input":{
            padding: "10px"
        }
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
        <PopOver ignoreClickAway close={patientProfileStore.toggleOnChangeDetails} title={t('coordinator.patientProfile.editDetails.title')}>
            <form className={classes.form}>
                <p>
                    {t('coordinator.patientProfile.editDetails.warning')}
                </p>
                <div className={classes.inputs}>
                    <InputItem
                        labelText={t('patient.userFields.firstName')}
                        value={patientProfileStore.changes.givenName}
                        id="givenName"

                    />
                    <InputItem
                        labelText={t('patient.userFields.lastName')}
                        value={patientProfileStore.changes.familyName}
                        id="familyName"

                    />
                    <InputItem
                        labelText={t('coordinator.patientProfile.phoneNumber')}
                        value={patientProfileStore.changes.phoneNumber}
                        id="phoneNumber"

                    />
                    <InputItem
                        isDate
                        labelText={t('coordinator.patientProfile.treatmentEnd')}
                        value={patientProfileStore.changes.phoneNumber}
                        id="phoneNumber"

                    />

                </div>
                <div className={classes.formControl}>
                    <Button disableElevation onClick={patientProfileStore.toggleOnChangeDetails} id="cancel" variant="contained" >{t('coordinator.patientProfile.editDetails.cancel')}</Button>
                    <Button className={classes.submit} disabled={!patientProfileStore.hasChanges} onClick={patientProfileStore.postPatientChanges} disableElevation id="submit" variant="contained" >{t('coordinator.patientProfile.editDetails.submit')}</Button>
                </div>

            </form>
        </PopOver>)
});

const InputItem = observer((props) => {
    const classes = useStyles();
    const { patientProfileStore } = useStores();
    const error = patientProfileStore.changes.errors[props.id]

    return (
        <div className={classes.inputItem}>
            <label className={classes.label} for={props.id}>{props.labelText}</label>
            {!props.isDate ? <TextField
                className={classes.textInput}
                id={props.id}
                variant="outlined"
                value={props.value}
                fullWidth
                error={error}
                onChange={e => {
                    patientProfileStore.changes[props.id] = e.target.value;
                }}
            /> : <DatePicker
                inputVariant="outlined"
                InputProps={{className: classes.calendarInput, fullWidth: true}}
                value={patientProfileStore.changes.treatmentEndDate}
                animateYearScrolling
                disablePast
            />}
            {error && <WarningBox className={classes.warning}>
            </WarningBox>}

        </div>
    )
});

export default ChangePatientDetails;
