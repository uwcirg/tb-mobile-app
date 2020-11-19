import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container:{
        width:"100%",
        textAlign: "center"
    }
})

const VersionNumber = () => {

    const classes = useStyles();
    const { t, i18n } = useTranslation('translation');

    return (<p className={classes.container}>
        Version {process.env.REACT_APP_GITHUB_VERSION || "Unknown"}
    </p>)

}

export default VersionNumber;