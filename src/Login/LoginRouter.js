import React, {useState} from 'react'
import LargeSelector from '../Basics/LargeSelector'
import {makeStyles, withTheme} from '@material-ui/core/styles'

//Components
import AppLogo from '../Basics/AppLogo'
import IconButton from '@material-ui/core/IconButton'
import LoginPage from './LoginPage'

//Icons
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Colors from '../Basics/Colors'
import ChevronLeftOutlined from '@material-ui/icons/ChevronLeftOutlined';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';

import {useTranslation} from 'react-i18next'

const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100vh",
        backgroundColor: "#0e3782",
    },
    selectionContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        justifyContent: "center",
        alignContent: "center",

    },
    logo: {
        paddingTop: "2em"
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
        width: "1.5em"
    },
    background:{
        position: "fixed",
        zIndex: "-1",
        bottom: 0,
        left: 0,
        height: "5000px",
        width: "5000px",
        backgroundColor: "#0e3782"
    }
  });


const Selection = (props) => {
    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (
    <div className={classes.selectionContainer}>
        <h2 className={classes.subtitle}>{t("login.selectType")}:</h2>
    <LargeSelector onClick={props.handleSelection} id="Patient" backgroundColor={Colors.blue}><AccountBoxIcon /><span>{t("userTypes.patient")}</span></LargeSelector>
        <LargeSelector onClick={props.handleSelection} id="Practitioner" backgroundColor={Colors.blue}><SupervisorAccountIcon /><span>{t("userTypes.coordinator")}</span></LargeSelector>
        <LargeSelector onClick={props.handleSelection} id="Administrator" backgroundColor={Colors.blue}><SupervisedUserCircleIcon /><span>{t("userTypes.admin")}</span></LargeSelector>
    </div>)
}

const LoginRouter = () => {
    const classes = useStyles();
    const [selection,setSelection] = useState("");

    const handleSelection = (id) => {
            setSelection(id)
    }

    return(
        <>
        <div className={classes.background} />
        <div className={`${classes.container} `}>
            {selection ? <IconButton onClick={() => {setSelection("")}} ><ChevronLeftOutlined className={classes.back}/></IconButton> : ""}
            <div className={classes.containerTop}>
                <AppLogo className={classes.logo}/>
            </div>
            <div className={classes.containerBottom}>
            {!selection ? <Selection handleSelection={handleSelection} /> : <LoginPage loginType={selection}/>}
            </div>
        </div>
        </>
    )
}

export default LoginRouter;