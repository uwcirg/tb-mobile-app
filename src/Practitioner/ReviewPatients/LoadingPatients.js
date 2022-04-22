import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Visual from '../../Basics/Icons/DoctorGroup.svg'

const useStyles = makeStyles({
    image: {
        maxWidth: "200px"
    },
    container: {
        padding: "2em",
        width: "100%",
        flexGrow: "1"
    },
    text: {
        fontSize: "1.5em"
    }
})

const LoadingPatients = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <Grid
            alignItems='center'
            direction="column"
            container className={classes.container}>
            <img className={classes.image} src={Visual} />
            <Box padding="2em 0">
                <Typography align='center' className={classes.text} variant="h2">{t('summaries.loading')}...</Typography>
            </Box>
            <CircularProgress variant='indeterminate' />
        </Grid>)

}

export default LoadingPatients;