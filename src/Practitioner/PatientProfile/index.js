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
import HorizontalButtons from './HorizontalOptions'
import Avatar from '@material-ui/core/Avatar'
import ArchivedOptions from './ArchivedOptions';

//Styles are at the bottom :)

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
                    <div className={classes.header}>
                        <div className={classes.profileHeader}>
                            <Avatar style={{ backgroundColor: Colors.green, marginRight: "1em" }} size="small">{patientProfileStore.selectedPatient.details.fullName[0]}</Avatar>
                            <h1>{patientProfileStore.selectedPatient.details.fullName}</h1>
                        </div>
                        <HorizontalButtons />
                    </div>
                    <ArchivedOptions />
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

const Loading = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    return (
        <div className={classes.message}>
            <h1> {t('commonWords.loading')}...</h1>
        </div>)
}

const useStyles = makeStyles({
    listItem: {
        fontWeight: "medium",
        textTransform: "capitalize"
    },
    top: {
        display: "flex",
        flexWrap: "wrap",
        flexShrink: 0,
        "& > div": {
            margin: "1em 0",
            marginRight: "1em",
            ...Styles.profileCard
        },
        "& > div:last-of-type":{
            marginRight: 0
        }
    },
    treatmentTimeline: {
        ...Styles.profileCard,
        alignSelf: "flex-start",
        backgroundColor: "white",
        minWidth: "300px",
        padding: "1em"
    },

    patientContainer: {
        height: "100vh",
        backgroundColor: Colors.lighterGray,
        overflowY: "scroll",
        width: "100%",
        padding: "1em",
        boxSizing: "border-box"
    },
    bottom: {
        width: "100%",
        display: "flex"
    },
    message: {
        width: "100%",
        height: "100%",
        ...Styles.flexCenter
    },
    header: {
        width: "100%",
        boxSizing: "border-box",
        padding: "1em",
        display: "flex",
        alignItems: "center",
        ...Styles.profileCard

    },
    profileHeader: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        "& > h1": {
            ...Styles.header,
            margin: 0
        }
    },
    combined:{
        width: "100%",
        ...Styles.profileCard,
        marginTop: "1em"
    }
})

export default Profile;