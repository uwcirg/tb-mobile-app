import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import PopOver from '../Shared/PopOver'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
import DatePicker from '../../Basics/DatePicker'
import { observer } from 'mobx-react'
import ProfileButton from './ProfileButton'
import CheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Colors from '../../Basics/Colors'
import TreatmentOutcomeSelection from '../Shared/TreatmentOutcomeSelection'

const useStyles = makeStyles({
    bottomButton: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "1em",
        "& > p": {
            marginRight: "auto",
            fontSize: ".9em",
            color: Colors.warningRed,
            maxWidth: "60%"
        }
    },
    form: {
        margin: "2em 0",
        display: "flex",
        flexDirection: "column"
    },
    formControl: {
        marginTop: "1em"
    }
})

const ArchiveDialog = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientProfileStore } = useStores();

    const allowSubmission = patientProfileStore.treatmentOutcome.appEndDate && patientProfileStore.treatmentOutcome.treatmentOutcome;

    return (<PopOver title={t('coordinator.patientProfile.options.archive')} ignoreClickAway close={patientProfileStore.toggleOnArchive}>
        <Typography variant="body1">
            {t('archive.explanation')}
        </Typography>
        <form className={classes.form}>
            <DatePicker
                inputVariant="outlined"
                className={classes.datePicker}
                value={patientProfileStore.treatmentOutcome.appEndDate}
                label={t('archive.appEndField')}
                onChange={(datetime) => { patientProfileStore.treatmentOutcome.appEndDate = datetime.toISO() }}
            />
            <SelectOutcome />
        </form>
        <div className={classes.bottomButton}>
            {!allowSubmission && <Typography variant="body1">{t('commonWords.fillAll')}</Typography>}
            <ProfileButton disabled={!allowSubmission} onClick={patientProfileStore.postTreatmentOutcome}>
                <CheckIcon style={{ fontSize: "1.5em" }} />
                {t('archive.complete')}
            </ProfileButton>
        </div>
    </PopOver>)

});

const SelectOutcome = observer(() => {
    const { treatmentOutcome, setTreatmentOutcome } = useStores().patientProfileStore;
    const classes = useStyles();
    return ( <TreatmentOutcomeSelection 
        className={classes.formControl}
        value={treatmentOutcome.treatmentOutcome} 
        setValue={setTreatmentOutcome} />)
})

export default ArchiveDialog;