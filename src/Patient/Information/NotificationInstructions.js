import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        padding: "1em"
    },
    list: {
        padding: 0,
        margin: 0,
        "& > li":{
            marginTop: "1em"
        },
        "& > li > img": {
            width: "100%",
            margin: "auto",
            marginTop: "1em",
            borderRadius: "5px"
        }
    }
})

const NotificationInstructions = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div className={classes.container}>
        <ol className={classes.list}>
            <Item number={1} text={t('notificationInstructions.steps.goToSettings')} />
            <Item number={2} text={t('notificationInstructions.steps.goToSettings')} />
            <Item number={3} text={t('notificationInstructions.steps.goToSettings')} />
            <Item number={4} text={t('notificationInstructions.steps.goToSettings')} />
        </ol>

    </div>)
}

const Item = ({ number, text }) => {
    return (<li>
        <Typography variant="body1">{text}</Typography>
        <img src={`/img/es-Ar/notification-instructions/${number}.jpg`} />
    </li>)
}
export default NotificationInstructions;