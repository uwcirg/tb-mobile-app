import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Colors from '../../Basics/Colors'
import WarningIcon from '@material-ui/icons/WarningRounded'
import ProfileButton from '../../Components/FlatButton'
import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import useStores from '../../Basics/UseStores'
import { useTranslation } from 'react-i18next'
import usePushEnabled from '../../Hooks/PushEnabled'
import PushFeatureList from '../Information/PushFeatureList'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'

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
    alert: {
        backgroundColor: Colors.accentBlue,
        color: "white",
        padding: ".5em 0",
        width: "100%",
        "& > span": {
            padding: "0 1em",
        },
        "& > button": {
            color: "white"
        }
    },
    warningIconLarge: {
        fontSize: "2em",
    },
    warning: {
        backgroundColor: Colors.warningRed
    }
})

const PushEnrollmentReminder = () => {

    const pushEnabledState = usePushEnabled();
    const classes = useStyles();
    const [showDetails, setShowDetails] = useState(false);

    const toggle = () => { setShowDetails(!showDetails) }

    return (
        <>
            {pushEnabledState !== "granted" &&
                <>
                    <Grid wrap="nowrap" onClick={toggle} alignItems="center" justify="space-around" container className={`${classes.alert} ${classes.warning}`}>
                        <Box width="1em" />
                        <WarningIcon className={classes.warningIconLarge} />
                        <span style={{ flexGrow: 1 }}>
                            <GetMessage type={pushEnabledState} />
                        </span>
                        <IconButton onClick={toggle}>
                            {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </Grid>
                    <Collapse style={{ width: "100%" }} in={showDetails}>
                        <GetDetails type={pushEnabledState} />
                    </Collapse>
                </>}
        </>
    )
}

const GetMessage = ({ type }) => {

    const { t } = useTranslation();

    if (type === 'denied' || type === 'default') {
        return <>{t('notificationInstructions.warning.title')}</>
    }

    return <>{t('notificationInstructions.warning.unsupported')}</>
}

const GetDetails = ({ type }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    const { uiStore, patientStore } = useStores();

    const goToInstructions = () => {
        uiStore.push("/information/notification-instructions")
    }

    if (type === 'denied') {
        return (<Box className={classes.warningContainer}>
            <PushFeatureList />
            <ProfileButton className={classes.button} onClick={goToInstructions}>
                {t('notificationInstructions.warning.button')}
                <RightIcon />
            </ProfileButton>
        </Box>)
    }

    if (type === 'default') {
        return (
            <Box className={classes.warningContainer}>
                <PushFeatureList />
                <ProfileButton className={classes.button} onClick={patientStore.subscribeToNotifications}>
                    {t('notificationInstructions.warning.ask')}
                    <RightIcon />
                </ProfileButton>
            </Box>
        )
    }


    return (<Box className={classes.warningContainer}>
        <Typography style={{ lineHeight: "1em" }} variant="body1">{t('notificationInstructions.warning.unsupportedDetails')} </Typography>
        <PushFeatureList />
    </Box>)
}

export default PushEnrollmentReminder;