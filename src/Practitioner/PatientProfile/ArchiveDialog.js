import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import PopOver from '../Shared/PopOver'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import DatePicker from '../../Basics/DatePicker'
import { observer } from 'mobx-react'
import ProfileButton from './ProfileButton'
import CheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Colors from '../../Basics/Colors'
import { treatmentOutcomes } from '../../Basics/Enums'

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

    const allowSubmission = patientProfileStore.archiveChanges.appEndDate && patientProfileStore.archiveChanges.treatmentOutcome;

    return (<PopOver title={t('coordinator.patientProfile.options.archive')} ignoreClickAway close={patientProfileStore.toggleOnArchive}>
        <Typography variant="body1">
            {t('archive.explanation')}
        </Typography>
        <form className={classes.form}>
            <DatePicker
                inputVariant="outlined"
                className={classes.datePicker}
                value={patientProfileStore.archiveChanges.appEndDate}
                label={t('archive.appEndField')}
                onChange={(datetime) => { patientProfileStore.archiveChanges.appEndDate = datetime.toISO() }}
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

    const { archiveChanges, setTreatmentOutcome } = useStores().patientProfileStore;
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const handleChange = (event) => {
        setTreatmentOutcome(event.target.value);
    };
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-treatment-outcome-label">{t('archive.treatmentOutcome')}</InputLabel>
            <Select
                labelId="select-treatment-outcome-label"
                id="select-treatment-outcome"
                value={archiveChanges.treatmentOutcome}
                onChange={handleChange}
                label={t('archive.treatmentOutcome')}>
                {treatmentOutcomes.map(each => {
                    return <MenuItem value={each}>{t(`archive.outcomeTypes.${each}`)}</MenuItem>
                })}
            </Select>
        </FormControl>
    )
})

export default ArchiveDialog;