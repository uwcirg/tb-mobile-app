import React from 'react';
import LargeSelector from '../Basics/LargeSelector';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';

//Components
import AppLogo from '../Basics/AppLogo';
import IconButton from '@material-ui/core/IconButton';
import LoginForm from './LoginForm';

//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Colors from '../Basics/Colors';
import ChevronLeftOutlined from '@material-ui/icons/ChevronLeftOutlined';

import { useTranslation } from 'react-i18next';
import ForgotPassword from './ForgotPassword';
import { Box, Grid, Typography } from '@material-ui/core';
import LoginLanguage from './LoginLanguage';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
    backContainer: {
        alignSelf: "flex-start"
    },
    container: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
    selectionContainer: {
        margin: "auto",
        width: "75%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2em 0"

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
        width: "100%"
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
});

const Selection = () => {
    const classes = useStyles();
    const { t } = useTranslation('translation');
    const { loginStore } = useStores();

    return (
        <div className={classes.selectionContainer}>
            <Grid container style={{color: "white"}}>
                <PersonIcon />
                <Box width="5px" />
                <Typography variant='body1' align='left' >{t("login.selectType")}:</Typography>
            </Grid>
            <LargeSelector onClick={loginStore.selectPatient} id="Patient" backgroundColor={Colors.blue}><AccountBoxIcon /><span>{t("userTypes.patient")}</span></LargeSelector>
            <LargeSelector onClick={loginStore.selectPractitioner} id="Practitioner" backgroundColor={Colors.blue}><SupervisorAccountIcon /><span>{t("userTypes.provider")}</span></LargeSelector>
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
                    <>{!loginStore.selectedUserType ? <Selection /> : <LoginForm />}</>}
            </div>
            {!loginStore.selectedUserType  && <LoginLanguage />}
        </div>
    )
});

export default LoginRouter;