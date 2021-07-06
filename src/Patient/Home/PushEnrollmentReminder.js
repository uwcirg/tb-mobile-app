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
        // boxShadow: "inset 0px -27px 24px -27px rgba(0,0,0,0.5)",
        "& > *": {
            // marginBottom: ".5em"
        },
        "& > ul": {
            margin: 0,
            marginBottom: "1em",
            padding: "0 0 0 1em"
        },
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
    unsupported:{
        backgroundColor: Colors.accentBlue,
        color: "white",
        padding: "1em 0",
        width: "100%",
        "& > span":{
            maxWidth: "70%"
        }
    },
    warningIconLarge:{
        fontSize: "2em",
    }
})


const PushEnrollmentReminder = () => {

    const { uiStore } = useStores();
    //Default to true so that its not flickering for happy path
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const pushEnabledState = usePushEnabled();

    const goToInstructions = () => {
        uiStore.push("/information?onPushEnrollmentInstructions=true")
    }

    return (<>
        {pushEnabledState === 'unsupported' &&
            <Grid alignItems="center" justify="space-around" container className={classes.unsupported}>
                <WarningIcon className={classes.warningIconLarge} />
                <span>
                    {t('notificationInstructions.warning.unsupported')}
                    <br />
                    <br />
                    {t('notificationInstructions.warning.unsupportedDetails')}
                </span>
            </Grid>
            }
        {pushEnabledState === "denied" && <Grid direction="column" className={classes.warningContainer} container spacing={1}>
            <Typography className={classes.title} variant="h2">{t('notificationInstructions.warning.title')}<WarningIcon /></Typography>
            <Typography variant="body1">{t('notificationInstructions.warning.subtitle')}</Typography>
            <ul>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.medicationReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.aptReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.msgAlerts')}</Typography></li>
            </ul>
            <ProfileButton className={classes.button} onClick={goToInstructions}>{t('notificationInstructions.warning.button')}<RightIcon /></ProfileButton>
        </Grid>}
    </>)

}

export default PushEnrollmentReminder;