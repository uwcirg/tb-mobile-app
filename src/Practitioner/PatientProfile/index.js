import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
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
})

const Profile = observer((props) => {

    const [onReset, setReset] = useState(false);
    const [onNote,setNote] = useState(true);
    const { practitionerStore,practitionerUIStore} = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');


    const closeResetPassword = () => {
        setReset(false)
        practitionerStore.newActivationCode = ""
    }

    const openResetPassword = () => {
        setReset(true);
    }

    const closeNote = () => {
        practitionerUIStore.closeAddPatientNote();
    }

    useEffect(() => {
        practitionerStore.getPatientDetails(props.id);

        return function cleanup() {
            closeResetPassword();
        }
    }, [])

    return (
        <>
            {onReset && <ResetPassword close={closeResetPassword} />}
            {practitionerUIStore.onAddPatientNote && <AddNote close={closeNote} />}
                <div className={classes.patientContainer}>
                    <div className={classes.top}>
                        <PatientInfo openResetPassword={openResetPassword} />
                        <TreatmentStatus />
                        <SymptomSummary />
                    </div>
                    <div className={classes.bottom}>
                        <ReportingHistory />
                        <div className={classes.treatmentTimeline}>
                            <Typography variant={"h2"}>{t('timeline.title')}</Typography>
                            <TreatmentTimeline weeksInTreatment={practitionerStore.selectedPatient.details.weeksInTreatment} />
                        </div>
                    </div>
                </div>

        </>)
});

export default Profile;