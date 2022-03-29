import React from 'react';
import { Box, Grid, Typography, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ExpandablePhoto from '../ExpandablePhoto';

const useStyles = makeStyles({

    reportDetails: {
        padding: "1em 0",
        width: "100%"
    },
    feedback: {
        fontStyle: "italic",
        paddingBottom: "1em"
    }
})

const PhotoRedoDetails = ({ reason, url }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<Grid className={classes.reportDetails} wrap="nowrap" container>
        <div>
            <Typography><strong>{t('redoPhoto.originalSubmission')}:</strong></Typography>
            <Typography className={classes.feedback}>{t('redoPhoto.feedback')}: {reason}</Typography>
        </div>
        <Box flexGrow="1" />
        <ExpandablePhoto url={url} />
    </Grid>)

}

export default PhotoRedoDetails;