import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import Colors from '../../Basics/Colors';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
    container: {
        padding: "1em",
        width: "100%",
        boxSizing: "border-box"
    },
    list: {
        padding: 0,
        margin: 0,
        "& > li": {
            marginTop: "1em",
            listStyleType: "none"
        },
        "& > li > img": {
            width: "100%",
            margin: "auto",
            marginTop: "1em",
            borderRadius: "5px"
        }
    },
    number: {
        borderRadius: "50%",
        color: "white",
        backgroundColor: Colors.accentBlue,
        width: "1.25em",
        height: "1.25em",
        marginBottom: ".5em"
    }
})

const NotificationInstructions = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div className={classes.container}>
        <ol className={classes.list}>
            <Item number={1} text={t('notificationInstructions.steps.goToSettings')} />
            <Item number={2} text={t('notificationInstructions.steps.clickNotifications')} />
            <Item number={3} text={t('notificationInstructions.steps.clickApp')} />
            <Item number={4} text={t('notificationInstructions.steps.allowNotifications')} />
            {/* <Item number={5} text={t('notificationInstructions.steps.verify')} /> */}
        </ol>

    </div>)
}

const Item = ({ number, text }) => {
    const classes = useStyles();
    return (<li>
        <Grid container justify="center" alignItems="center" className={classes.number} spacing={1}>
            <span >{number}</span>
        </Grid>
        <Typography variant="body1">
            {text}
        </Typography>
        <img src={`/img/es-Ar/notification-instructions/${number}.jpg`} />
    </li>)
}
export default NotificationInstructions;