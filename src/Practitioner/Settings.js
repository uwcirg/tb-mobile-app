import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../Basics/UseStores';
import { observer } from 'mobx-react';
import LanguageQuestion from '../Basics/LanguageQuestion';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';

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
        marginLeft: "1em"
    },
    reportContainer: {
        width: "50%"
    },
    patient: {
        backgroundColor: "lightgray"
    },
    button:{
        display:"block",
        margin: "auto",
        marginTop: "2em"
    }
})

const Settings = observer((props) => {
    const { t } = useTranslation('translation');
    const { practitionerStore, loginStore } = useStores();

    useEffect(() => {
        practitionerStore.getRecentReports()
    }, [])

    const handleLogout = () => {
        practitionerStore.logout();
        loginStore.logout();
        push("/")
      }


    const classes = useStyles();

    return (<div className={classes.container}>
        <h1>{t('patient.profile.title')}</h1>
        <LanguageQuestion />
    <Button variant="contained" className={classes.button} onClick={handleLogout}>{t('patient.profile.logout')}</Button>
    </div>)

});

export default Settings;