import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import PatientInfo from './Details/PatientInfo';
import TreatmentStatus from './Adherence/AdherenceSummary';
import SymptomSummary from './SymptomSummary';
import TreatmentTimeline from '../../Basics/TreatmentTimeline';
import ReportingHistory from './ReportingHistory';
import SectionLabel from '../../Components/SectionLabel';
import PatientProfileDialogs from './Dialogs/';
import ArchivedOptions from './Dialogs/ArchivedOptions';
import ProfileHeader from './Header';
import useWindowSize from '../../Hooks/Resize';
import MobileView from './MobileView';
import { useParams } from 'react-router-dom';

const Profile = observer(() => {

    const { id: patientId } = useParams();

    const { practitionerStore, patientProfileStore, uiStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const isMobileView = useWindowSize().size.width < 830;

    const closeResetPassword = () => {
        patientProfileStore.closeResetPassword();
        practitionerStore.newActivationCode = ""
    }

    useEffect(() => {
        patientProfileStore.getPatientDetails(patientId);

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

    if (!patientProfileStore.selectedPatient.loaded) return <Loading />;
    if (patientProfileStore.selectedPatient.accessError) return <p className={classes.message}>{t('coordinator.patientProfile.accessError')}</p>;

    return (
        <>
            <PatientProfileDialogs />
            {isMobileView ? <MobileView /> : <DesktopProfile />}
        </>)
});

const DesktopProfile = observer(() => {

    const { patientProfileStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={classes.patientContainer}>
        <ProfileHeader />
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
    </div>)
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
            flex: "1 1 0",
            margin: "1em 0",
            marginRight: "1em",
            ...Styles.profileCard
        },
        "& > div:last-of-type": {
            marginRight: 0
        }
    },
    treatmentTimeline: {
        ...Styles.profileCard,
        alignSelf: "flex-start",
        backgroundColor: "white",
        minWidth: "280px",
        padding: "1em",
        marginLeft: "1em"
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
        display: "flex",
        overflow: "hidden"
    },
    message: {
        width: "100%",
        height: "100%",
        ...Styles.flexCenter
    }
})

export default Profile;