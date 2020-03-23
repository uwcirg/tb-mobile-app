import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import { Typography } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import { DateTime } from 'luxon';
import TimeIcon from '@material-ui/icons/AccessTime';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';

import Options from './Options'

const useStyles = makeStyles({
    header: {
        ...Styles.flexColumn,
        alignContent: "center"
    },
    photoContainer: {
        width: "50px",
        height: "50px",
        borderRadius: "25px",
        backgroundColor: Colors.accentBlue,
        position: "relative",
        color: "white",
        margin: "auto"
    },
    photo: {
        fontSize: "2em",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
    },
    container: {
        ...Styles.flexColumn,
        margin: "1em",
        minHeight: "25vh",
        width: "90%",
    },
    name: {
        textAlign: "center",
        fontSize: "1em",
        margin: ".5em 0 .5em 0",
    },
    patientInfo: {
        width: "100%",
        borderRadius: "5px",
        border: "solid 1px lightgray",
    },
    profileItem: {
        ...Styles.flexRow,
        margin: ".5em",
        alignItems: "center",
        "& > svg": {
            color: "gray"
        },
        "& > div": {
            ...Styles.flexColumn,
            margin: " 0 0 0 1em",
            "& > h1,p": {
                fontSize: ".9em",
                padding: "5px 0 0 0",
                margin: 0
            }
        }
    }

})

const HealthProfile = () => {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (<>
        <OverTopBar title={t("profile.title")} handleBack={() => { uiStore.menuOpened = false }} ></OverTopBar>
        <div className={classes.container}>
            <PatientInfo />
        </div>
    </>
    )
}


function PatientInfo() {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.header}>
            <div>
                <div className={classes.photoContainer}>
                    <div className={classes.photo}>{patientStore.givenName[0]}</div>
                </div>
                <Typography className={classes.name} className={classes.name} variant="h2">{patientStore.givenName} {patientStore.familyName}</Typography>
            </div>
            <div className={classes.patientInfo}>
                <ProfileItem title={t("profile.startDate")} text="Feb 12" icon={<TimeIcon />} />
                <ProfileItem title={t("profile.endDate")} text="Feb 12" icon={<FlagIcon />} />
                <ProfileItem title={t("profile.organization")} text={patientStore.managingOrganization} icon={<LocationIcon />} />
            </div>
        <Options />
        </div>
    )
}



function ProfileItem(props) {

    const classes = useStyles();
    return (
        <div className={classes.profileItem}>
            {props.icon}
            <div>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default HealthProfile;