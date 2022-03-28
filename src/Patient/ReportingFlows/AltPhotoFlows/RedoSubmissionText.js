import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import ExpandablePhoto from '../../../Components/ExpandablePhoto';

const useStyles = makeStyles({
    reportDetails: {
        padding: "1em 0",
        width: "100%"
    }
})

const RedoSubmissionText = ({ redoOriginalReportUrl, redoReason }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<>
        <Typography>{t('redoPhoto.explanation')}</Typography>
        <Grid className={classes.reportDetails} wrap="nowrap" container>
            <div>
                <Typography><strong>{t('redoPhoto.assistantMessage')}:</strong></Typography>
                <Typography className={classes.feedback}>{redoReason}</Typography>
            </div>
            <Box flexGrow="1" />
            <ExpandablePhoto url={redoOriginalReportUrl} />
        </Grid> </>)

}

export default RedoSubmissionText;