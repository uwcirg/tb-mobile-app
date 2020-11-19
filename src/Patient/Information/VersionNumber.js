import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Colors from '../../Basics/Colors'

const useStyles = makeStyles({
    container:{
        display: "flex",
        paddingTop: "1em",
        width:"100%",
        textAlign: "center",
        alignItems:"center",
        justifyContent:"center",
        "& > a":{
            color: Colors.buttonBlue,
            marginLeft: "5px",
            textDecoration: "none"
        }
    }
})

const VersionNumber = () => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<div className={classes.container}>
        <Typography variant="body1">{t('patient.information.version')}: </Typography> <a href={`https://github.com/uwcirg/tb-mobile-app/commit/${process.env.REACT_APP_BUILD_NUMBER}`}>{process.env.REACT_APP_GITHUB_VERSION || "Unknown"}</a>
    </div>)

}

export default VersionNumber;