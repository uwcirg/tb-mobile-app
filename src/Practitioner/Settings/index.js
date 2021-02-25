import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Colors from '../../Basics/Colors';
import { observer } from 'mobx-react';
import LanguageQuestion from '../../Basics/LanguageQuestion';
import { useTranslation } from 'react-i18next';
import { Button, ButtonBase, Typography } from '@material-ui/core';
import PasswordUpdate from '../../Shared/PasswordUpdate'
import GlobeIcon from '@material-ui/icons/Public';
import PasswordIcon from '@material-ui/icons/Lock';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PasswordReset from '../../Shared/PasswordUpdate';
import Documents from './Documents'
import PatientIcon from '@material-ui/icons/Accessibility';
import DocIcon from '@material-ui/icons/Description';
import PersonIcon from '@material-ui/icons/Person';
import ReportProblem from '@material-ui/icons/ReportProblem';
import PatientInformation from '../../Patient/Information'

import useLogout from '../../Basics/Logout'
import Profile from './Profile';

const useStyles = makeStyles({
    image: {
        height: "100px",
        marginLeft: "auto"
    },
    report: {
        display: "flex",
        width: "100%",
        border: "2px solid lightgray"

    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        marginLeft: "1em"
    },
    reportContainer: {
        width: "50%"
    },
    patient: {
        backgroundColor: "lightgray"
    },
    button: {
        display: "block",
        margin: "auto",
        marginTop: "2em"
    },
    navigation: {
        boxSizing: "border-box",
        width: "250px",
        minWidth: "250px",
        height: "100%",
        paddingTop: "1em",
        borderRight: "solid 1px lightgray"
    },
    navItemContainer: {
        listStyle: "none",
        height: "2.5em"
    },
    navItem: {
        boxSizing: "border-box",
        height: "100%",
        margin: ".5em 0 0 0",
        padding: ".25em",
        display: "flex",
        width: "90%",
        borderRadius: "7px",
        color: props => props.selected ? "white" : Colors.buttonBlue,
        backgroundColor: props => props.selected ? Colors.textGray : Colors.lightgray,
        "& > span:first-letter": {
            textTransform: "capitalize"
        },
        alignItems: "center",
        justifyContent: "flex-start",
        "& > *:first-child": {
            marginRight: "5px"
        },
        fontSize: "1em"

    },
    header: {
        fontSize: "1.5em",
    },
    list: {
        padding: "1em 0 0 0",
        margin: 0
    },
    body: {
        padding: "1em",
        flex: 1,
        height: "100vh",
        overflow: "scroll",
        boxSizing: "border-box"
    },
    bodyContent: {
        borderTop: "1px solid black",
        marginTop: "1em",
        width: "100%"
    },
    patientInformation: {
        width: "50%"
    },
    topInfo: {
        padding: "1em"
    },
    password: {
        width: "50%"
    }
})

const Settings = (props) => {

    const classes = useStyles();
    const { practitionerUIStore } = useStores();

    //Default To Account Page
    useEffect(() => { practitionerUIStore.settingsTab = "documents" }, [])

    return (<div className={classes.container}>
        <SettingsNav />
        <BodyRouter />
    </div>)

};

const SettingsNav = (props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <div className={classes.navigation}>
            <Typography className={classes.header} variant="h2">{t('patient.tabNames.information')}</Typography>
            <ul className={classes.list}>
                <NavItem id="documents" icon={<DocIcon />} text={t("coordinator.settingsPage.documents")} />
                <NavItem id="patientInformation" icon={<PatientIcon />} text={t("coordinator.settingsPage.patientInformation")} />
                <NavItem href="https://forms.gle/rRxp9f4bbVT5uB4R9" icon={<ReportProblem />} text={t('patient.information.reportIssue')} />
            </ul>
            <br />
            <Typography className={classes.header} variant="h2">{t('patient.profile.title')}</Typography>
            <ul className={classes.list}>
                {/*<NavItem id="account" icon={<PersonIcon />} text={t('patient.profile.options.account')} /> */}
                <NavItem id="language" icon={<GlobeIcon />} text={t('patient.profile.options.language')} />
                <NavItem id="updatePassword" icon={<PasswordIcon />} text={t('patient.profile.changePassword')} />
                <NavItem id="logout" icon={<LogoutIcon />} text={t('patient.profile.logout')} />
            </ul>
        </div>
    )
}

const NavItem = observer((props) => {
    const { t } = useTranslation('translation');
    const { practitionerUIStore } = useStores();
    const classes = useStyles({
        selected: practitionerUIStore.settingsTab === props.id,
        isLogout: props.id === "logout"
    });
    const logout = useLogout();


    const handleClick = (id) => {

        if (id === "logout") {
            logout();
            return
        }

        practitionerUIStore.settingsTab = props.id
    }

    return (<li className={classes.navItemContainer}>
        <ButtonBase href={props.href} target="blank" onClick={() => { handleClick(props.id) }} className={classes.navItem}>
            {props.icon}
            <span>{props.text}</span>
        </ButtonBase>
    </li>)
})

const BodyRouter = observer((props) => {
    const { practitionerUIStore } = useStores();
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <div className={classes.body}>
            <Typography className={classes.header} variant="h2">{t(`coordinator.settingsPage.${practitionerUIStore.settingsTab}`)}</Typography>
            <div className={classes.bodyContent}>
                {practitionerUIStore.settingsTab === "language" && <LanguageQuestion noTitle />}
                {practitionerUIStore.settingsTab === "documents" && <Documents />}
                {practitionerUIStore.settingsTab === "updatePassword" && <div className={classes.password}><PasswordReset /></div>}
                {practitionerUIStore.settingsTab === "account" && <Profile />}
                {practitionerUIStore.settingsTab === "patientInformation" && <div className={classes.patientInformation}>
                    <Typography className={classes.topInfo} variant="body1">
                        {t('coordinator.settingsPage.patientViewExplanation')}
                    </Typography>
                    <PatientInformation />
                </div>}
            </div>
        </div>

    )
})

export default Settings;