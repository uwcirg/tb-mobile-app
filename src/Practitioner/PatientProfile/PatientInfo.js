import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import ProfileButton from './ProfileButton'
import Message from '@material-ui/icons/ChatBubble';
import Add from '@material-ui/icons/AddCircle';
import Refresh from '@material-ui/icons/Refresh'

const useStyles = makeStyles({

    container: {
        ...Styles.flexColumn,
        flexBasis: "33%",
        flexGrow: 1,
        backgroundColor: "white",
        padding: "1em"
    },
    profileHeader: {
        display: "flex",
        alignItems: "center",
        "& > h1": {
            ...Styles.header,
            margin: 0,
            marginRight: "auto"
        }
    },
    item: {
        ...Styles.flexColumn,
        marginRight: ".5em",
        marginTop: "1em",
        "& > span": {

            margin: 0,
            ...Styles.profileItem
        },
        "& > span:nth-child(1)": {
            textTransform: "capitalize"
        },
        "& > span:nth-child(2)": {
            fontWeight: "bold",
            paddingTop: ".5em"
        }
    },
    detailGroup: {
        display: "flex",
        flexWrap: "true",
        width: "100%",
        "& > div": {
            marginRight: "2em"
        },
        marginBottom: "1em"
    },
    buttons: {
        marginTop: "auto",
        display: "flex",
        "& > button": {
            marginRight: "1em"
        }
    }

})

const PatientInfo = observer((props) => {

    const classes = useStyles();
    const { practitionerStore, patientProfileStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED))
    }

    return (<div className={classes.container}>
        {patientProfileStore.selectedPatient.details && <div className={classes.profileHeader}>
            <h1>{patientProfileStore.selectedPatient.details.fullName}</h1>
            <button onClick={patientProfileStore.toggleOnChangeDetails}>Edit Details</button>
                </div>}
        <div className={classes.detailGroup}>
            <Item top={t("coordinator.patientProfile.age")} bottom={patientProfileStore.selectedPatient.details.age || "N/A"} />
            <Item top={t("coordinator.patientProfile.gender")} bottom={patientProfileStore.selectedPatient.details.gender|| "N/A"} />
            <Item top={t("coordinator.patientProfile.phoneNumber")} bottom={patientProfileStore.selectedPatient.details.phoneNumber} />
        </div>
        <Item top={t("coordinator.patientProfile.treatmentStart")} bottom={getDate(patientProfileStore.selectedPatient.details.treatmentStart)} />
        <Item top={t("coordinator.patientProfile.lastContacted")} bottom={getDate(patientProfileStore.selectedPatient.details.lastContacted)} />

        <Buttons {...props} />

    </div>)

})

const Buttons = observer((props) => {
    const { practitionerUIStore, practitionerStore, patientProfileStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const messagePatient = () => {
        practitionerUIStore.goToChannel(patientProfileStore.selectedPatient.details.channelId);
    }



    return (
        <div className={classes.buttons}>
            <ProfileButton onClick={messagePatient}><Message />{t("coordinator.patientProfile.options.message")}</ProfileButton>
            <ProfileButton onClick={practitionerUIStore.openAddPatientNote} ><Add />{t("coordinator.patientProfile.options.note")}</ProfileButton>
            <ProfileButton onClick={patientProfileStore.toggleOnPasswordReset} backgroundColor={Colors.warningRed} border><Refresh />{t("coordinator.patientProfile.options.resetPassword")}</ProfileButton>
        </div>
    )
})

const Item = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.item}>
            <span>{props.top}</span>
            <span>{props.bottom}</span>
        </div>)
}

export default PatientInfo;