import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon'
import Styles from '../../Basics/Styles';
import Buttons from './OptionButtons'
import Colors from '../../Basics/Colors';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({

    container: {
        flexGrow: 1,
        ...Styles.flexRow,
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
    details:{
        borderRight: `2px solid ${Colors.lightgray}`,
        flex: '1 1 0'
    }

})

const PatientInfo = observer((props) => {

    const classes = useStyles();
    const { patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString(DateTime.DATE_MED))
    }

    return (<div className={classes.container}>
        <div className={classes.details}>
            {patientProfileStore.selectedPatient.details && <div className={classes.profileHeader}>
                <Avatar style={{backgroundColor: Colors.green, marginRight:"1em"}} size="small">{patientProfileStore.selectedPatient.details.fullName[0]}</Avatar>
                <h1>{patientProfileStore.selectedPatient.details.fullName}</h1>
            </div>}
            <div className={classes.detailGroup}>
                <Item top={t("coordinator.patientProfile.age")} bottom={patientProfileStore.selectedPatient.details.age || "N/A"} />
                <Item top={t("coordinator.patientProfile.gender")} bottom={patientProfileStore.selectedPatient.details.gender || "N/A"} />
                <Item top={t("coordinator.patientProfile.phoneNumber")} bottom={patientProfileStore.selectedPatient.details.phoneNumber} />
            </div>
            <Item top={t("coordinator.patientProfile.treatmentStart")} bottom={getDate(patientProfileStore.selectedPatient.details.treatmentStart)} />
            <Item top={t("coordinator.patientProfile.treatmentEnd")} bottom={getDate(patientProfileStore.selectedPatient.details.treatmentEndDate)} />
            <Item top={t("coordinator.patientProfile.lastContacted")} bottom={getDate(patientProfileStore.selectedPatient.details.lastContacted)} />
        </div>
        <Buttons />
    </div>)

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