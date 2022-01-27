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
import { Avatar, Box, Button, Collapse, Grid, IconButton } from '@material-ui/core';
import Globe from '@material-ui/icons/Language';
import { Close, Lock, Translate } from '@material-ui/icons';

const SectionLabel = ({ children }) => {
    const classes = useStyles();
    return <Grid className={classes.sectionLabel} container alignItems="center">{children}</Grid>;
}

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

    const [showDebugging, setShowDebugging] = useState(false);

    return (
        <>
                    <div className={classes.fullContainer}>
            <Grid container alignItems='center'>
                <IconButton onClick={patientUIStore.closeSettings}> <Close /></IconButton>
                <Typography>{t("patient.profile.title")}</Typography>
            </Grid>
                <div className={classes.header}>
                    <Avatar className={classes.avatar}>{patientStore.givenName[0]}</Avatar>
                    <Typography variant="body1">{patientStore.givenName} {patientStore.familyName}</Typography>
                </div>
                <SectionLabel>
                    <Lock />
                    <Typography variant="h2">{t("patient.profile.personalInfo")}</Typography>
                </SectionLabel>
                <PersonalInformation />
                <SectionLabel>
                    <Translate />
                    <Typography variant='h2'>{t('patient.profile.options.language')}</Typography>
                </SectionLabel>
                <Language />
                <Button onClick={() => { setShowDebugging(!showDebugging) }}>Show Debugging</Button>
                <Collapse in={showDebugging}>
                    <Debugging />
                </Collapse>
                <Box flexGrow={1} />
                <div className={classes.logoutContainer}>
                    <NewButton onClick={logout} className={classes.logout} icon={<ExitToApp />} text={t("patient.profile.logout")} />
                </div>
            </div>
        </>
    )
})

const useStyles = makeStyles({
    sectionLabel: {
        display: "flex",
        justifyContent: "flex-start",
        "& > svg": {
            fontSize: "1em",
            marginRight: "5px"
        },
        "& > h2": {
            fontSize: "1em",
        },
        padding: "1em 0"
    },
    avatar: {
        backgroundColor: Colors.approvedGreen
    },
    fullContainer: {
        width: "100%",
        padding: "0 1em",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"

    },
    logout: {
        width: "100%",
        boxSizing: "border-box"
    },
    header: {
        width: "100%",
        ...Styles.flexColumn,
        alignItems: "center",
        padding: "1em 0",
        backgroundColor: Colors.lightgray,
        borderRadius: "4px"
    },
    name: {
        textAlign: "center",
        fontSize: "1em",
        margin: ".5em 0 .5em 0",
    },
    logoutContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box"
    },
    pwContainer: {
        width: "90%",
        height: "100%"
    }


})

export default HealthProfile;