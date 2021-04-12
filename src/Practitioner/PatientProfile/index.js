import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import ResetPassword from './ResetPassword'

import PatientInfo from './PatientInfo'
import TreatmentStatus from './TreatmentStatus'
import SymptomSummary from './SymptomSummary'

import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import ReportingHistory from './ReportingHistory'
import { Typography } from '@material-ui/core';
import AddNote from './AddNote'
import ChangePatientDetails from './ChangePatientDetails'

const useStyles = makeStyles({
    listItem: {
        fontWeight: "medium",
        textTransform: "capitalize"
    },
    top: {
        width: "95%",
        marginBottom: "1em",
        display: "flex",
        justifyContent: "center",
        flexShrink: 0,
        "& > div": {

            ...Styles.profileCard,
            margin: "0 .5em 0 .5em",
        },
        paddingTop: "1em",
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
        height: "100vh",
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
    }
})

const Profile = observer((props) => {

    const { practitionerStore, practitionerUIStore, patientProfileStore, uiStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');


    const closeResetPassword = () => {
        patientProfileStore.closeResetPassword();
        practitionerStore.newActivationCode = ""
    }

    const closeNote = () => {
        practitionerUIStore.closeAddPatientNote();
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
            {patientProfileStore.onPasswordReset && <ResetPassword />}
            {practitionerUIStore.onAddPatientNote && <AddNote close={closeNote} />}
            {patientProfileStore.onChangeDetails && <ChangePatientDetails />}

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
                            <Typography variant={"h2"}>{t('timeline.title')}</Typography>
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

export default Profile;