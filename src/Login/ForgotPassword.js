import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import useStores from '../Basics/UseStores';

const useStyles = makeStyles({
    container: {
        width: "80%",
        margin: "auto",
        color: "white",
        height: "auto"
    },
    button: {
        marginTop: "3em",
        color: "white",
        borderRadius: "5px",
        border: "1px solid white"
    },
    buttonContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "flex-end"
    }
})

const ForgotPassword = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { loginStore } = useStores();

    return (<div className={classes.container}>
        {t('login.forgotPasswordDetails')}
        <div className={classes.buttonContainer}>
        <Button onClick={loginStore.selectPatient} className={classes.button} >
                {t('patient.report.symptoms.warning.button')}
            </Button>
        </div>
    </div>)

}

export default ForgotPassword;