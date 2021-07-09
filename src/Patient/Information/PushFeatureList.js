import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    list: {

        margin: 0,
        marginBottom: "1em",
        padding: "0 0 0 1em"
    }
})

const PushFeatureList = ({ hideHeader }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <>
            {!hideHeader && <Typography variant="body1">{t('notificationInstructions.warning.subtitle')}</Typography>}
            <ul className={classes.list}>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.msgAlerts')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.medicationReminders')}</Typography></li>
                <li>  <Typography variant="body1">{t('notificationInstructions.warning.aptReminders')}</Typography></li>
            </ul>
        </>
    )
}

export default PushFeatureList;