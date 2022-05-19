import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Colors from '../../Basics/Colors'
import isIndonesiaPilot from '../../Utility/check-indonesia-flag'

const useStyles = makeStyles({
    container: {
        padding: "1em 0",
        color: props => props.isLoginScreen ? Colors.accentBlue : "black",
        display: "flex",
        paddingTop: "1em",
        width: "100%",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        "& > a, & > a:visited": {
            color: props => props.isLoginScreen ? Colors.accentBlue : Colors.buttonBlue,
            marginLeft: "5px",
            textDecoration: props => props.isLoginScreen ? "underline" : "none"
        }
    }
})

const VersionNumber = ({isLoginScreen}) => {

    let versionNumber = process.env.REACT_APP_GITHUB_VERSION || "Unknown";


    versionNumber = versionNumber.split("-")[0]

    const classes = useStyles({isLoginScreen: isLoginScreen});
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <Typography variant="body1">{t('patient.information.version')}: </Typography>
        <a href={`https://github.com/uwcirg/tb-mobile-app/commit/${process.env.REACT_APP_BUILD_NUMBER}`}>
            {versionNumber}
            {isIndonesiaPilot && "- Indonesia"}
        </a>
    </div>)

}

export default VersionNumber;