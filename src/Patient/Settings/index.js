import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import OverTopBar from '../Navigation/OverTopBar';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Styles from '../../Basics/Styles';
import { observer } from 'mobx-react';
import NewButton from '../../Basics/NewButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import PasswordUpdate from '../../Components/PasswordUpdate';
import PersonalInformation from './PersonalInformation';
import useLogout from '../../Basics/Logout';
import Debugging from './Debugging';
import Language from './Language';
import Colors from '../../Basics/Colors';
import { Button, Collapse } from '@material-ui/core';

const HealthProfile = observer(() => {

    const classes = useStyles();
    const { patientUIStore } = useStores();
    const { t } = useTranslation('translation');

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
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');
    const logout = useLogout();

    const [showDebugging,setShowDebugging] = useState(false);

    return (
        <>
            <OverTopBar title={t("patient.profile.title")} handleBack={patientUIStore.closeSettings} ></OverTopBar>
            <div className={classes.fullContainer}>
                <div className={classes.header}>
                    <div className={classes.photoContainer}>
                        <div className={classes.photo}>{patientStore.givenName[0]}</div>
                    </div>
                    <Typography className={classes.name} className={classes.name} variant="h2">{patientStore.givenName} {patientStore.familyName}</Typography>
                </div>
                <Language />
                <PersonalInformation />
                <Button onClick={()=>{setShowDebugging(!showDebugging)}}>Show Debugging</Button>
                <Collapse in={showDebugging}>
                    <Debugging />
                </Collapse>
                <div className={classes.logoutContainer}>
                    <NewButton onClick={logout} className={classes.logout} icon={<ExitToApp />} text={t("patient.profile.logout")} />
                </div>
            </div>
        </>
    )
})

const useStyles = makeStyles({
    fullContainer: {
        width: "100%",
        padding: "1em",
        boxSizing: "border-box"
    },
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
        backgroundColor: Colors.approvedGreen,
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
    logoutContainer: {
        width: "100%",
        display: "flex",
        position: "fixed",
        justifyContent: "center",
        backgroundColor: "white",
        boxSizing: "border-box"
    },
    pwContainer: {
        width: "90%",
        height: "100%"
    }


})

export default HealthProfile;