import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    topText: {
        padding: "1em 0"
    }
})

const BackSubmissionText = ({ requestDateFormatted, photo }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (
        <>
            <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.requestedOn')}
                <br />
                <strong>{requestDateFormatted}</strong>.
            </Typography>
            {!photo && <Typography className={classes.topText} variant="body1" color="initial">
                {t('missedPhotoDetails.future')}
            </Typography>}
        </>
    )
}

export default BackSubmissionText;