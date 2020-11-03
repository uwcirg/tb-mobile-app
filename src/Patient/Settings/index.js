import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores'
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Styles from '../../Basics/Styles';
import Colors from '../../Basics/Colors';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { observer } from 'mobx-react'
import NewButton from '../../Basics/NewButton'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Globe from '@material-ui/icons/Language';
import PasswordUpdate from '../../Shared/PasswordUpdate'
import { testObject } from '../../DataStores/SaveReportOffline'

import PersonalInformation from './PersonalInformation'

const HealthProfile = observer(() => {

    const classes = useStyles();
    const { patientUIStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    let Component = <MainSettings />
    if (patientUIStore.onPasswordUpdate) Component = (
        <div className={classes.pwContainer} >
            <OverTopBar title={t("settings.updatePassword")} handleBack={patientUIStore.closePasswordUpdate} ></OverTopBar>
            <PasswordUpdate />
        </div>)

    return (<>
        <div className={classes.container}>
            {Component}
        </div>
    </>
    )
})

const MainSettings = observer(() => {
    const classes = useStyles();
    const { patientStore, uiStore, patientUIStore, loginStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleLogout = () => {
        uiStore.menuOpened = false;
        patientStore.logoutPatient();
        patientUIStore.clearURL();
        loginStore.userType = "";
    }

    return (
        <>
            <OverTopBar title={t("patient.profile.title")} handleBack={patientUIStore.closeSettings} ></OverTopBar>
            <div className={classes.header}>
                <div className={classes.photoContainer}>
                    <div className={classes.photo}>{patientStore.givenName[0]}</div>
                </div>
                <Typography className={classes.name} className={classes.name} variant="h2">{patientStore.givenName} {patientStore.familyName}</Typography>
            </div>
            <LanguageQuestion />
            <PersonalInformation />
            <Debugging />
            <div className={classes.logoutContainer}>
                <NewButton onClick={handleLogout} className={classes.logout} icon={<ExitToApp />} text={t("patient.profile.logout")} />
            </div>
        </>
    )
})

const LanguageQuestion = observer(() => {
    const classes = useStyles();
    const { uiStore } = useStores();
    const { t, i18n } = useTranslation('translation');

    return (
        <div className={classes.languageContainer}>
            <div className={classes.language}>
                <Globe />
                <Typography variant="h2">{t("patient.profile.options.language")}</Typography>
            </div>
            <ButtonGroup className={classes.group} fullWidth color="primary">
                <Button onClick={() => { uiStore.setLocale("en") }} className={uiStore.locale === "en" ? classes.selected : classes.default}>{t("patient.profile.options.english")}</Button>
                <Button onClick={() => { uiStore.setLocale("es-AR") }} className={uiStore.locale === "es-AR" ? classes.selected : classes.default}>{t("patient.profile.options.spanish")}</Button>
            </ButtonGroup>
        </div>
    );
})

const Debugging = observer((props) => {
    const classes = useStyles();
    const { patientStore } = useStores();

    return (
        <>
            {window._env.ENVIRONMENT === "development" ?
                <div className={classes.debugging}>
                    Debugging Mode Enabled (config.js or set with environment variable in docker)
            <Button onClick={testObject}>Seed Offline Reports</Button>
                    <TextField
                        id="standard-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={patientStore.patientInformation.daysInTreatment}
                        onChange={(e) => { patientStore.patientInformation.daysInTreatment = e.target.value }}
                    />
                </div> :
                ""}
        </>
    )
})

const useStyles = makeStyles({
    logout: {
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
    logoutContainer: {
        width: "100%",
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        bottom: "0px",
        padding: "5px",
        backgroundColor: "white"
    },
    selected: {
        backgroundColor: Colors.buttonBlue,
        color: "white",
        "&:hover": {
            color: Colors.white,
            backgroundColor: Colors.accentBlue
        }
    },
    default: {
        backgroundColor: "white",
        color: Colors.buttonBlue,
        "&:hover": {
            color: Colors.buttonBlue,
            backgroundColor: Colors.accentBlue
        }
    },
    group: {
        width: "70%",
        margin: "1em"
    },
    language: {
        width: "90%",
        marginLeft: "1em",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        "& > svg": {
            fontSize: "1em",
            marginRight: "5px"
        },
        "& > h2": {
            fontSize: "1.25em",
        }
    },
    languageContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    debugging: {
        padding: "1em"
    },
    pwContainer:{
        width: "90%",
        height: "100%"
    }


})

export default HealthProfile;