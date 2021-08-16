import React from 'react';
import ConfirmationLayout from '../../Components/Patient/ConfirmationLayout';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Colors from '../../Basics/Colors';
import NextButton from './NextButton';
import Check from '@material-ui/icons/Check';


const useStyles = makeStyles({
    body: {
        padding: "1em 1.5em",
        minHeight: "60vh",
        "& > *": {
            marginBottom: "1em",
            textAlign: "left",
            padding: ".5em",
            borderRadius: "5px"
        }
    },
    success:{
        backgroundColor: Colors.calendarGreen
    },
    reachOut:{
        backgroundColor: Colors.highlightYellow,

    }
})

const ConfirmationScreen = ({ numberOfTests, numberOfContacts, wasError, handleNext }) => {

    const { uiStore, patientStore } = useStores();
    const { t } = useTranslation('translation');

    const completeSurvey = () => {
        uiStore.push("/");
        patientStore.initalize();
    }

    const completed = numberOfTests >= numberOfContacts;

    const body = wasError ? <Error /> : <Success completed={completed} />

    return (
        <>
            {body}
            <NextButton onClick={completeSurvey} text={t('patient.report.symptoms.warning.button')} />
        </>
    )
}

const Success = ({ completed }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <Grid container className={classes.body} direction="column" justify="center" align="center">

            <ConfirmationLayout title={t('commonWords.successMessage')} subtitle={t('householdTesting.recorded')} />
            <Typography variant="body1" color="initial">{t('householdTesting.thanks')}</Typography>
            {completed ? <CompleteMessage /> : <IncompleteMessage />}
        </Grid>
    )
}

const CompleteMessage = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return(
        <Typography className={classes.success} variant="body1">{t('householdTesting.completed')}</Typography>
    )
    
}

const IncompleteMessage = () => {
     const { t } = useTranslation('translation');
     const classes = useStyles();

    return (
    <>
        <Typography variant="body1">{t('householdTesting.explanation')}</Typography>
        <Typography variant="body1" className={classes.reachOut}>{t('householdTesting.reachOut')}</Typography>
    </>
    )
}

const Error = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div></div>)

}

export default ConfirmationScreen;