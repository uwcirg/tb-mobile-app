import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import TimeIcon from '@material-ui/icons/AccessTime';
import FlagIcon from '@material-ui/icons/FlagOutlined';
import LocationIcon from '@material-ui/icons/LocationOn';
import Options from './Options'
import NewButton from '../../Basics/NewButton'
import ExitToApp from '@material-ui/icons/ExitToApp';
import { DateTime } from 'luxon';
import ClickableText from '../../Basics/ClickableText';

const HealthProfile = () => {

    const classes = useStyles();
    const { patientStore, uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (<>
        <OverTopBar title={t("patient.profile.title")} handleBack={() => { uiStore.menuOpened = false }} ></OverTopBar>
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

    const handleLogout = () => {
        uiStore.menuOpened = false;
        patientStore.logoutPatient();
      }

    const handleDemo = () => {
        uiStore.menuOpened = false;
        uiStore.activeTab = 0;
        patientStore.introEnabled = true
    }

    const testDate = DateTime.local().plus({weeks: 2})
    const testDateString = testDate.toLocaleString(DateTime.DATE_MED);

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.photoContainer}>
                    <div className={classes.photo}>{patientStore.givenName[0]}</div>
                </div>
                <Typography className={classes.name} className={classes.name} variant="h2">{patientStore.givenName} {patientStore.familyName}</Typography>
            </div>
            <NewButton onClick={handleLogout} className={classes.logout} icon={<ExitToApp />} text={t("patient.profile.logout")} />
            <ClickableText className={classes.demoButton} big onClick={handleDemo} text={t("patient.demo.showDemo")}></ClickableText>
           
            <div className={classes.containedBox}>
                {/*
                <div>
                    <ProfileItem title={t("patient.profile.startDate")} text={testDateString} icon={<TimeIcon />} />
                    <ProfileItem title={t("patient.profile.endDate")} text={testDateString} icon={<FlagIcon />} />
                    <ProfileItem title={t("patient.profile.organization")} text={patientStore.managingOrganization} icon={<LocationIcon />} />
                </div>
                */}

               <Options />

            </div>
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

const useStyles = makeStyles({
    logout:{
        width: "90%"
    },
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
        alignItems: "center",
        margin: "1em",
        minHeight: "25vh",
        width: "100%",
    },
    name: {
        textAlign: "center",
        fontSize: "1em",
        margin: ".5em 0 .5em 0",
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
    },
    preference: {
        ...Styles.flexRow,
        justifyContent: "space-between",
        width: "90%",
        margin: "auto"

    },
    blueText: {
        fontSize: "1em"
    },
    line: {
        display: "block",
        width: "100%",
        borderBottom: "solid 1px lightgray"
    },
    containedBox: {
        width: "100%",
        "& > div": {
                margin: "auto",
                width: "90%",
                borderRadius: "5px",
                border: "solid 1px lightgray",
                marginBottom: "1em",
                "& > h1": {
                    fontSize: "1.25em",
                    marginLeft: '1em'
                }
        }
        
    },
    demoButton: {
        marginBottom: "1em"
    }


})

export default HealthProfile;