import React from 'react';
import LargeSelector from '../Basics/LargeSelector';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';

//Components
import AppLogo from '../Basics/AppLogo';
import IconButton from '@material-ui/core/IconButton';
import LoginPage from './LoginForm';

//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Colors from '../Basics/Colors';
import ChevronLeftOutlined from '@material-ui/icons/ChevronLeftOutlined';

import { useTranslation } from 'react-i18next';
import { ButtonBase } from '@material-ui/core';
import Globe from '@material-ui/icons/Language';
import ForgotPassword from './ForgotPassword';

const useStyles = makeStyles({
    backContainer: {
        alignSelf: "flex-start"
    },
    container: {
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    selectionContainer: {
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",
        "& > h2": {
            marginTop: "auto"
        }

    },
    logo: {
        paddingTop: "2em",
        "& > img": {
            height: "100px"
        }
    },
    containerBottom: {
        height: "60%"
    },
    containerTop: {
        height: "30%",
    },
    subtitle: {
        color: "white",
        fontSize: "1em",
        margin: 0,
        padding: 0,
        textAlign: "center",
        fontWeight: 500
    },

    back: {
        color: "white",
        height: "1.5em",
        width: "1.5em",
        alignSelf: "flex-start"
    },
    background: {
        position: "fixed",
        zIndex: "-1",
        bottom: 0,
        left: 0,
        height: "5000px",
        width: "5000px",
        backgroundColor: "#0e3782"
    },
    languageChange: {
        color: "white",
        marginTop: "auto",
        fontSize: ".75em",
        "& > svg": {
            marginRight: "5px"
        }
    }
});

const Selection = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { uiStore, loginStore } = useStores();

    return (
        <div className={classes.selectionContainer}>
            <h2 className={classes.subtitle}>{t("login.selectType")}:</h2>
            <LargeSelector onClick={loginStore.selectPatient} id="Patient" backgroundColor={Colors.blue}><AccountBoxIcon /><span>{t("userTypes.patient")}</span></LargeSelector>
            <LargeSelector onClick={loginStore.selectPractitioner} id="Practitioner" backgroundColor={Colors.blue}><SupervisorAccountIcon /><span>{t("userTypes.provider")}</span></LargeSelector>
            <ButtonBase className={classes.languageChange} onClick={uiStore.toggleLanguage}><Globe />{t("login.changeLanguage")}</ButtonBase>
        </div>)
}

const LoginRouter = observer(() => {
    const classes = useStyles();
    const { loginStore } = useStores();

    return (

        <div className={`${classes.container} `}>
            <div className={classes.background} />
            {(loginStore.selectedUserType || loginStore.onForgotPassword) && <IconButton className={classes.backContainer} onClick={loginStore.goHome} ><ChevronLeftOutlined className={classes.back} /></IconButton>}
            <div className={classes.containerTop}>
                <AppLogo white className={classes.logo} />
            </div>
            <div className={classes.containerBottom}>
                {loginStore.onForgotPassword ? <ForgotPassword /> :
                    <>{!loginStore.selectedUserType ? <Selection /> : <LoginPage />}</>}
            </div>
        </div>
    )
});

export default LoginRouter;