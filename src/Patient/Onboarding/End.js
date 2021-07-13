import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { Typography } from '@material-ui/core';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import { useTranslation } from 'react-i18next';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import BottomButton from './BottomButton';

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    text: {
        marginTop: "1em",
        fontSize: "1.5em"
    }
})

function Alert(props) {
    return (
        <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={props.handleClose} autoHideDuration={6000}>
            <MuiAlert onClose={props.handleClose} elevation={6} variant="filled" {...props} />
        </Snackbar>)
}

const End = observer((props) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { activationStore, patientStore, patientUIStore } = useStores();

    useEffect(() => {
        //On Successful Activation re pull in patient info + move
        if (activationStore.activationSuccess) {
            patientStore.getPatientInformation().then(() => {
                patientUIStore.goToHome();
                patientUIStore.goToWalkThrough();
                patientStore.getPatientInformation();
            })
        }
        return function cleanup() {
            activationStore.activationSuccess = false;
        }
    }, [activationStore.activationSuccess])

    return (
        <>
            <div className={props.bodyClass}>
                <div>
                    <DoctorIcon />
                    <Typography className={classes.text} variant="h2">{t('patient.onboarding.endText')}</Typography>
                    {activationStore.activationErrorDetail && <Typography variant="body1">Error:  {activationStore.activationErrorDetail} </Typography>}
                    {activationStore.activationError &&
                        <Alert handleClose={activationStore.clearActivationError} severity="error">
                            {t("patient.onboarding.activationError")}
                        </Alert>}
                </div>
            </div>
            <BottomButton onClick={activationStore.submitActivation} />
        </>
    )

});

export default End;