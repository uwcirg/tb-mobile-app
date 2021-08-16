import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import NextButton from './NextButton';
import Colors from '../../Basics/Colors';


const useStyles = makeStyles({
    body: {
        minHeight: "70vh",
        padding: "0 2em",
        "& > *": {
            marginBottom: "1em"
        }
    },
    graphic:{
        width: "90%"
    }
})

const Explanation = ({handleNext}) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <>
        <Grid container justify="center" alignItems="center" direction="column" className={classes.body}>
            <img className={classes.graphic} src="treatment-update.png" />
             <Typography variant="body1" color="initial"> {t('patient.onboarding.contactTracing.important')}</Typography>
             <Typography variant="body1" color="initial">{t('patient.onboarding.contactTracing.explanation')}</Typography>
        </Grid>
        <NextButton onClick={handleNext} text={t('patient.onboarding.next')} />
        </>
        )

}

export default Explanation;