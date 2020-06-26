import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import { Typography } from '@material-ui/core';
import { ReactComponent as DoctorIcon } from '../../Basics/Icons/doctor.svg';
import { useTranslation } from 'react-i18next';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

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
    return(
    <Snackbar open={open} anchorOrigin={{vertical: "top", horizontal: "center"}} onClose={props.handleClose} autoHideDuration={6000}>
        <MuiAlert onClose={props.handleClose} elevation={6} variant="filled" {...props} />
  </Snackbar>)
  }

const End = observer((props) => {
    const { t, i18n } = useTranslation('onboarding');
    const classes = useStyles();
    const { activationStore, patientStore, patientUIStore } = useStores();

    useEffect(() => {
        //On Successful Activation re pull in patient info + move
        if(activationStore.activationSuccess){
           patientStore.getPatientInformation().then( () => {
               patientUIStore.goToHome();
           })
        } 
    },[activationStore.activationSuccess])

    return (
        <>
            <div className={props.bodyClass}>
                <div>
                    <DoctorIcon />
                    <Typography className={classes.text} variant="h2">{t('endText')}</Typography>
                    {activationStore.activationError && <Alert handleClose={() => {activationStore.activationError = false}} severity="error">Error with account activation</Alert>}
                </div>
            </div>
            {React.cloneElement(props.button, {
                onClick: () => {
                    activationStore.submitActivation();
                    props.handleNext();
                }
            })}
        </>
    )

});

export default End;