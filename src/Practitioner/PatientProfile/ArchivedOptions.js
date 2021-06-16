import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import Colors from '../../Basics/Colors'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Styles from '../../Basics/Styles'
import ProfileButton from './ProfileButton'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles({
    archived: {
        ...Styles.profileCard,
        marginTop: "1em",
        overflow: "hidden",
        "& > div": {
            padding: "1em"
        }
    },
    warning: {
        backgroundColor: Colors.warningRed,
        color: "white",
        "& > svg": {
            marginRight: ".5em"
        }
    },
    details: {
        display: "flex",
        alignItems: "center",
        "& > button": {
            marginLeft: "auto"
        }
    },
    outcomeSection: {
        "&:last-of-type": {
            border: "none",
        },
        borderRight: "1px solid gray",
        "& > h2": {
            fontSize: "1em",
            fontWeight: "bold",
            color: Colors.textDarkGray
        },
        padding: "1em"
    }
})

const ArchivedOptions = observer(() => {

    const classes = useStyles();
    const { patientProfileStore } = useStores();

    return (
        <>
            {patientProfileStore.isArchived && <Grid container direction="column" className={classes.archived}>
                <Warning />
                <TreatmentOutcomes />
            </Grid>}
        </>
    )
})

const Warning = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <Grid container alignItems="center" className={classes.warning}>
            <ErrorOutlineIcon />
            <Typography variant="body1">{t('archive.warningShort')}</Typography>
        </Grid>
    )
}

const TreatmentOutcomes = observer(() => {
    const classes = useStyles();
    const { patientProfileStore } = useStores();
    const { treatmentOutcome, appEndDate } = patientProfileStore.treatmentOutcomes;
    const { t } = useTranslation('translation');

    return (
        <div className={classes.details}>
            <OutcomeSection title={t('archive.treatmentOutcome')} 
            body={treatmentOutcome ? t(`archive.outcomeTypes.${treatmentOutcome}`) : t('archive.notSelected')} />
            <OutcomeSection title={t('archive.appEndField')} body={appEndDate} />
            <ProfileButton onClick={patientProfileStore.toggleUpdateOutcome}>
                <EditIcon />
                {t("coordinator.patientProfile.options.editOutcome")}
            </ProfileButton>
        </div>
    )
})

const OutcomeSection = ({ title, body }) => {
    const classes = useStyles();
    return (
        <div className={classes.outcomeSection}>
            <Typography variant="h2">{title}</Typography>
            <Typography variant="body1">{body}</Typography>
        </div>
    )
}


export default ArchivedOptions;