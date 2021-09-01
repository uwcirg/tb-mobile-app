import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles({
    container: {
        width: "100%",
        minHeight: "150px"
    },
    text:{
        fontSize: "1.5em",
        textTransform: "lowercase"
    }
})

const ReportsLoading = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<Grid alignItems="center" justify="center" container spacing={1}>
        <Typography className={classes.text} variant="h2">{t('commonWords.loading')} {t('coordinator.patientProfile.listReports')}</Typography>
        <CircularProgress variant="indeterminate" />
    </Grid>)

}

export default ReportsLoading;