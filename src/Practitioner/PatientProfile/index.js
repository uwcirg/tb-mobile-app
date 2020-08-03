import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import Styles from '../../Basics/Styles';
import { DateTime } from 'luxon';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Loading from '../Shared/CardLoading'
import ChatIcon from '@material-ui/icons/ChatBubble';
import KeyIcon from '@material-ui/icons/VpnKey';
import ArchiveIcon from '@material-ui/icons/HowToReg';
import ResetPassword from './ResetPassword'

import PatientInfo from './PatientInfo'
import TreatmentStatus from './TreatmentStatus'
import SymptomSummary from './SymptomSummary'

import TreatmentTimeline from '../../Basics/TreatmentTimeline'
import ReportingHistory from './ReportingHistory'
import { Typography } from '@material-ui/core';


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
    treatmentTimeline:{
        ...Styles.profileCard,
        alignSelf: "flex-start",
        backgroundColor: "white",
        marginRight: ".5em",
        minWidth: "300px",
        padding:  "1em"
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
    const { practitionerStore } = useStores();
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');


    const handleCloseReset = () => {
        setReset(false)
        practitionerStore.newActivationCode = ""
    }

    useEffect(() => {
        practitionerStore.getPatientDetails(props.id);
        return function cleanup() {
            handleCloseReset();
        }
    }, [])

    return (
        <>
            {onReset && <ResetPassword close={handleCloseReset} />}
            <div className={classes.patientContainer}>
                <div className={classes.top}>
                    <PatientInfo>
                        <div onClick={() => { setReset(true) }}><KeyIcon /></div>
                    </PatientInfo>

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