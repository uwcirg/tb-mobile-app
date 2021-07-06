import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Colors from '../../Basics/Colors'
import WarningIcon from '@material-ui/icons/WarningRounded'
import ProfileButton from '../../Practitioner/PatientProfile/ProfileButton'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import useStores from '../../Basics/UseStores'
import { useTranslation } from 'react-i18next'
import usePushEnabled from '../../Hooks/PushEnabled'

const useStyles = makeStyles({
    warningContainer: {
        backgroundColor: "white",
        padding: "1.5em 2em",
        boxSizing: "border-box",
        width: "100%",
        "& > p, & > span": {
            padding: ".5em"
        }
    },
    button: {
        alignSelf: "flex-end",
        textTransform: "capitalize",
        alignItems: "center",
        "& > span > svg": {
            paddingRight: 0,
            fontSize: "1.5em"
        }
    },
    title: {
        display: "flex",
        fontSize: "1.2em",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.warningRed,
        padding: ".5em",
        color: "white",
        borderRadius: "5px"
    },
    unsupported: {
        backgroundColor: Colors.accentBlue,
        color: "white",
        padding: "1em 0",
        width: "100%",
        "& > span": {
            maxWidth: "70%"
        }
    },
    warningIconLarge: {
        fontSize: "2em",
    },
    list: {

        margin: 0,
        marginBottom: "1em",
        padding: "0 0 0 1em"
    }
})


const PushEnrollmentReminder = () => {
    
    const pushEnabledState = usePushEnabled();

    switch (pushEnabledState) {
        case 'unsupported':
            return <UnsupportedWarning />;
        case 'denied':
            return <DeniedWarning />;
        case 'default':
            return <AskToEnroll />;
        default:
            return <></>
    }
}

const DeniedWarning = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();

    const { uiStore } = useStores();
    const goToInstructions = () => {
        uiStore.push("/information?onPushEnrollmentInstructions=true")
    }

    return( 
        <Grid direction="column" className={classes.warningContainer} container spacing={1}>
            <Typography className={classes.title} variant="h2">{t('notificationInstructions.warning.title')}<WarningIcon /></Typography>
            <FeatureList />
            <ProfileButton className={classes.button} onClick={goToInstructions}>{t('notificationInstructions.warning.button')}<RightIcon /></ProfileButton>
        </Grid>
    )
}

const UnsupportedWarning = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <Grid alignItems="center" justify="space-around" container className={classes.unsupported}>
            <WarningIcon className={classes.warningIconLarge} />
            <span>
                {t('notificationInstructions.warning.unsupported')}
                <br />
                <br />
                {t('notificationInstructions.warning.unsupportedDetails')}
            </span>
        </Grid>
    )
}

const AskToEnroll = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientStore } = useStores();

    return (<Grid direction="column" className={classes.warningContainer} container spacing={1}>
        <Typography className={classes.title} variant="h2">{t('notificationInstructions.warning.title')}<WarningIcon /></Typography>
        <FeatureList />
        <ProfileButton className={classes.button} onClick={patientStore.subscribeToNotifications}>{t('notificationInstructions.warning.ask')}<RightIcon /></ProfileButton>
    </Grid>

    )
}

const FeatureList = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <>
            <Typography variant="body1">{t('notificationInstructions.warning.subtitle')}</Typography>
            <ul className={classes.list}>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.medicationReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.aptReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.msgAlerts')}</Typography></li>
            </ul>
        </>
    )
}

export default PushEnrollmentReminder;