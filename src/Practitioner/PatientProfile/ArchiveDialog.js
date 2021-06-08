import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import PopOver from '../Shared/PopOver'
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import DatePicker from '../../Basics/DatePicker'
import { observer } from 'mobx-react'
import NewButton from '../../Basics/NewButton'
import ProfileButton from './ProfileButton'
import CheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Colors from '../../Basics/Colors'


const useStyles = makeStyles({
    bottomButton: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "1em"
    },
    form: {
        margin: "2em 0",
        display: "flex",
        flexDirection: "column"
    },
    formControl:{
        marginTop: "1em"
    }
})

const ArchiveDialog = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientProfileStore } = useStores();

    return (<PopOver title={"Archive Patient"} ignoreClickAway close={patientProfileStore.toggleOnArchive}>
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
            <ProfileButton onClick={patientProfileStore.postTreatmentOutcome} backgroundColor={Colors.warningRed}><CheckIcon style={{ fontSize: "1.5em" }} />Complete</ProfileButton>
        </div>
    </PopOver>)

});

const SelectOutcome = () => {
    const [age, setAge] = React.useState('');
    const classes = useStyles();
    const handleChange = (event) => {
        setAge(event.target.value);
      };
    return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Treatment Outcome</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={age}
                onChange={handleChange}
                label="Treatment Outcome"
            >
                <MenuItem value={10}>Successful Completion</MenuItem>
                <MenuItem value={20}>Dropped Treatment</MenuItem>
            </Select>
        </FormControl>
    )
}

export default ArchiveDialog;