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
import HorizontalButtons from './HorizontalOptions'
import Avatar from '@material-ui/core/Avatar'


const useStyles = makeStyles({
    listItem: {
        fontWeight: "medium",
        textTransform: "capitalize"
    },
    top: {
        display: "flex",
        justifyContent: "space-between",
        flexShrink: 0,
        "& > div": {
            margin: "0 .5em 0 .5em"
        }
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
        height: "100vh",
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
        "& > p": {
            marginLeft: ".5em"
        }
    },
    middle: {
        width: "100%",
        boxSizing: "border-box",
        padding: "1em",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid lightgray"
    },
    profileHeader: {
        display: "flex",
        flexWrap: "nowrap",
        flexGrow: 1,
        alignItems: "center",
        "& > h1": {
            ...Styles.header,
            margin: 0
        }
    },
    combined:{
        width: "95%",
        ...Styles.profileCard,
        margin: "1em"
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
            <PatientProfileDialogs />
            {patientProfileStore.selectedPatient.loaded ?
                <>{!patientProfileStore.selectedPatient.accessError ? <div className={classes.patientContainer}>
                    {patientProfileStore.isArchived && <ArchivedError />}
                    <div className={classes.combined}>
                    <div className={classes.middle}>
                        <div className={classes.profileHeader}>
                            <Avatar style={{ backgroundColor: Colors.green, marginRight: "1em" }} size="small">{patientProfileStore.selectedPatient.details.fullName[0]}</Avatar>
                            <h1>{patientProfileStore.selectedPatient.details.fullName}</h1>
                        </div>
                        <HorizontalButtons />
                    </div>
                    
                    <div className={classes.top}>
                        <PatientInfo />
                        <TreatmentStatus />
                        <SymptomSummary />
                    </div>
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