import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import {observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Styles from '../../../Basics/Styles';
import Colors from '../../../Basics/Colors';
import WarningBox from '../../../Basics/WarningBox';
import DatePicker from '../../../Basics/DatePicker';
import FlatButton from '../../../Components/FlatButton';
import { useTranslation } from 'react-i18next';
import PatientInput from './Input';

const useStyles = makeStyles({
    formLabels: {
        ...Styles.header,
        marginTop: "1em",
        marginBottom: ".5em",
        fontSize: "1em",
        "&:first-of-type": {
            marginTop: ".5em"
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
    formBottom: {
        marginTop: "2em",
        marginBottom: ".5em"
    },
    inputBody: {
        borderBottom: `1px solid ${Colors.lightgray}`,
        borderTop: `1px solid ${Colors.lightgray}`,
        paddingBottom: "1em",
        "& .MuiInputBase-root": {
            marginRight: "1em"
        }
    },
  
})

const AddPatientForm = observer((props) => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { practitionerStore } = useStores();

    const handleDateTimeChange = (datetime) => {
        practitionerStore.newPatient.params.treatmentStart = datetime.toISO();
    }

    const displayError = practitionerStore.newPatient.errors["phoneNumber"]
    const submitDisabled = !practitionerStore.newPatient.params.givenName || !practitionerStore.newPatient.params.givenName || (practitionerStore.newPatient.params.phoneNumber.length < 5)

    return (
        <div className={classes.newPatientForm}>
            <form className={classes.inputBody} noValidate autoComplete="off">
                {displayError && <WarningBox className={classes.warning}>{t('coordinator.patientProfile.editDetails.inputError')}</WarningBox>}
                <Typography className={classes.formLabels}>{t('coordinator.patientTableLabels.name')}</Typography>
                <PatientInput id="givenName" />
                <PatientInput id="familyName" />
                <br />
                <Typography className={classes.formLabels}>{t('coordinator.patientProfile.phoneNumber')}</Typography>
                <PatientInput id="phoneNumber" />
                <Typography className={classes.formLabels}>{t('patient.userFields.treatmentStart')}</Typography>
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
            </form>
            <Grid className={classes.formBottom} container alignItems="center" justify="flex-end">
                {submitDisabled && <Typography style={{ maxWidth: "50%", marginRight: "auto" }}>{t('commonWords.fillAll')} *</Typography>}
                <FlatButton disabled={submitDisabled} className={classes.submit} onClick={props.submit}>{t('coordinator.patientProfile.editDetails.submit')}</FlatButton>
            </Grid>
        </div>
    )
})

export default AddPatientForm ;