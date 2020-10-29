import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import { observer } from 'mobx-react';
import LanguageQuestion from '../Basics/LanguageQuestion';
import { useTranslation } from 'react-i18next';
import { Button, ButtonBase, Typography } from '@material-ui/core';
import PasswordUpdate from '../Shared/PasswordUpdate'
import GlobeIcon from '@material-ui/icons/Public';
import PasswordIcon from '@material-ui/icons/Lock';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PasswordReset from '../Shared/PasswordUpdate';

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
        flexBasis: "250px",
        height: "100%",
        paddingTop: "1em",
        borderRight: "solid 1px lightgray"
    },
    navItemContainer: {
        listStyle: "none",
        height: "2.5em",
    },
    navItem: {
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
        flex: 1
    },
    bodyContent: {
        borderTop: "1px solid black",
        marginTop: "1em",
        width: "100%"
    }
})

const Settings = (props) => {

    const classes = useStyles();
    const [selection, setSelection] = useState("treatment-information")

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
                <NavItem id="treatment-information" icon={<GlobeIcon />} text={t('patient.profile.options.language')} />
                <NavItem icon={<LogoutIcon />} text={t('patient.profile.logout')} />
            </ul>
            <br />
            <Typography className={classes.header} variant="h2">{t('patient.profile.title')}</Typography>
            <ul className={classes.list}>
                <NavItem id="language" icon={<GlobeIcon />} text={t('patient.profile.options.language')} />
                <NavItem id="password" icon={<PasswordIcon />} text={t('patient.profile.changePassword')} />
                <NavItem id="logout" icon={<LogoutIcon />} text={t('patient.profile.logout')} />
            </ul>
        </div>
    )
}

const NavItem = observer((props) => {
    const { t } = useTranslation('translation');
    const { practitionerUIStore } = useStores();
    const classes = useStyles({ selected: practitionerUIStore.settingsTab === props.id });

    return (<li className={classes.navItemContainer}>
        <ButtonBase onClick={() => { practitionerUIStore.settingsTab = props.id }} className={classes.navItem}>
            {props.icon}
            <span>{props.text}</span>
        </ButtonBase>
    </li>)
})

const BodyRouter = observer((props) => {
    const { practitionerUIStore } = useStores();
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <Typography className={classes.header} variant="h2">{practitionerUIStore.settingsTab}</Typography>
            <div className={classes.bodyContent}>
            {practitionerUIStore.settingsTab === "language" && <LanguageQuestion noTitle />}
            {practitionerUIStore.settingsTab === "treatment-information" && <p> Information</p>}
            {practitionerUIStore.settingsTab === "password" && <PasswordReset />}
            </div>
        </div>

    )
})

/*
const SettingsBody = observer(() => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    const { practitionerStore, loginStore, practitionerUIStore } = useStores();

    useEffect(() => {
        practitionerStore.getRecentReports()
    }, [])

    const handleLogout = () => {
        practitionerStore.logout();
        loginStore.logout();
        practitionerUIStore.resetPath();
    }

    return (
        <div className={classes.body}>
            <BodyRouter selection={selection} />
            <LanguageQuestion />
            <Button variant="contained" className={classes.button} onClick={handleLogout}>{t('patient.profile.logout')}</Button>
            <Button onClick={() => { setOnPassword(!onPassword) }}>Reset Password</Button>
            {onPassword && <PasswordUpdate />}

        </div>
    )
});
*/

export default Settings;