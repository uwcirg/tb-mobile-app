import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PushFeatureList from '../Information/PushFeatureList'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Colors from '../../Basics/Colors';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        padding: "0 2em"
    },
    image: {
        width: "100%",
        margin: "1em auto",
        display: "block",
        borderRadius: "5px"
    },
    header: {
        margin: "auto"
    },
    icon: {
        fontSize: "5em",
        color: Colors.blue,
        marginRight: "5px"
    },
    listTitle:{
        margin: "1em 0"
    }
})

const AskPermissions = (props) => {
    const classes = useStyles();
    const {patientStore} = useStores();
    const { t } = useTranslation('translation');

    return (
        <>
            <div className={classes.container}>

                <Grid justify="center" alignItems="center" className={classes.header} container spacing={1}>
                    <NotificationImportantIcon className={classes.icon} />
                    <Typography align="center" variant="h1" color="initial">{t('patient.onboarding.notification.header')}</Typography>
                </Grid>
                <img className={classes.image} src="/img/es-Ar/notification-instructions/example.png" />
                <Typography className={classes.listTitle} variant="body1">{t('patient.onboarding.notification.whenPrompted')} <strong>{t('patient.onboarding.notification.permit')}</strong></Typography>
                <Typography variant="body1"> {t('patient.onboarding.notification.listHeader')}:</Typography>
                <PushFeatureList hideHeader />
            </div>
            {React.cloneElement(props.button, {
                onClick: () => {
                    patientStore.subscribeToNotifications();
                    props.handleNext();
                }
            })}
        </>
    )
}


export default AskPermissions;