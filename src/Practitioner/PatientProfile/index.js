import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import PatientInfo from './PatientInfo'
import TreatmentStatus from './AdherenceSummary'
import SymptomSummary from './SymptomSummary'
import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import ReportingHistory from './ReportingHistory'
import SectionLabel from '../../Components/SectionLabel'
import PatientProfileDialogs from './Dialogs'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Grid, Typography } from '@material-ui/core';


const useStyles = makeStyles({
    listItem: {
        fontWeight: "medium",
        textTransform: "capitalize"
    },
    top: {
        width: "95%",
        marginBottom: "1em",
        display: "flex",
        flexShrink: 0,
        "& > div": {
            ...Styles.profileCard,
            margin: "1em .5em 0 .5em",
        },
        flexWrap: "wrap"
    },
    treatmentTimeline: {
        ...Styles.profileCard,
        alignSelf: "flex-start",
        backgroundColor: "white",
        marginRight: ".5em",
        minWidth: "300px",
        padding: "1em"
    },

    patientContainer: {
        ...Styles.flexColumn,
        backgroundColor: Colors.lighterGray,
        overflowY: "scroll",
        width: "100%",
        alignItems: "center",
        "& > div + div": {
            marginBottom: "2em"
        }
    },
    bottom: {
        width: "95%",
        display: "flex"
    },
    message: {
        width: "100%",
        height: "100%",
        ...Styles.flexCenter
    },
    archived: {
        width: "100%",
        backgroundColor: Colors.warningRed,
        color: "white",
        padding: "1em",
        "& > p":{
            marginLeft: ".5em"
        }
    }
})

const Profile = observer((props) => {

    const { practitionerStore, patientProfileStore, uiStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const closeResetPassword = () => {
        patientProfileStore.closeResetPassword();
        practitionerStore.newActivationCode = ""
    }

    useEffect(() => {
        patientProfileStore.getPatientDetails(props.id);

        return function cleanup() {
            closeResetPassword();
            patientProfileStore.resetUpdateState();
        }
    }, [])

    useEffect(() => {
        if (patientProfileStore.changes.success) {
            uiStore.setAlert(t('coordinator.patientProfile.editDetails.success'))
        }
    }, [patientProfileStore.changes.success])

    return (
        <>
            {patientProfileStore.isArchived && <ArchivedError />}
            <PatientProfileDialogs />
            {patientProfileStore.selectedPatient.loaded ?
                <>{!patientProfileStore.selectedPatient.accessError ? <div className={classes.patientContainer}>
                    <div className={classes.top}>
                        <PatientInfo />
                        <TreatmentStatus />
                        <SymptomSummary />
                    </div>
                    <div className={classes.bottom}>
                        <ReportingHistory />
                        <div className={classes.treatmentTimeline}>
                            <SectionLabel>{t('timeline.title')}</SectionLabel>
                            <TreatmentTimeline weeksInTreatment={patientProfileStore.selectedPatient.details.weeksInTreatment} />
                        </div>
                    </div>
                </div> : <p className={classes.message}>{t('coordinator.patientProfile.accessError')}</p>} </> : <Loading />}

        </>)
});


const ArchivedError = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <Grid container alignItems="center" justify="center" className={classes.archived}>
            <ErrorOutlineIcon />
            <Typography variant="body1">{t('archive.profileWarning')}</Typography>
        </Grid>)
}


const Loading = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <div className={classes.message}>
            <h1> {t('commonWords.loading')}...</h1>
        </div>)
}

export default Profile;