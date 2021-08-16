import ConfirmationLayout from '../../Components/Patient/ConfirmationLayout';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Colors from '../../Basics/Colors';
import NextButton from './NextButton';
import React from 'react';
import { CircularProgress } from '@material-ui/core';



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
    loading:{
        height: "80vh"
    },
    success: {
        backgroundColor: Colors.calendarGreen
    },
    reachOut: {
        backgroundColor: Colors.highlightYellow,

    },
    error: {
        backgroundColor: Colors.calendarRed
    }
})

const ConfirmationScreen = ({ numberOfTests, numberOfContacts, wasError, handleNext, isLoading }) => {

    const { uiStore, patientStore } = useStores();
    const { t } = useTranslation('translation');

    const completeSurvey = () => {
        uiStore.push("/");
        patientStore.initalize();
    }

    const completed = numberOfTests >= numberOfContacts;

    const body = wasError ? <Error /> : <Body completed={completed} error={wasError} />;

    if (isLoading) return <Loading />

    return (
        <>
            <Body completed={completed} error={wasError} />
            <NextButton onClick={completeSurvey} text={t('patient.report.symptoms.warning.button')} />
        </>
    )
}

const Body = ({ completed, error }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <Grid container className={classes.body} direction="column" justify="center" align="center">
            {error ? <Error /> : <>
                <ConfirmationLayout title={t('commonWords.successMessage')} subtitle={t('householdTesting.recorded')} />
                <Typography variant="body1" color="initial">{t('householdTesting.thanks')}</Typography>
                <CompletionMessage completed={completed} />
            </>}
        </Grid>
    )
}

const CompletionMessage = ({ completed }) => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return (<Typography className={completed ? classes.success : classes.reachOut} variant="body1">
        {completed ? t('householdTesting.completed') : t('householdTesting.reachOut')}
    </Typography>)
}

const Error = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<Typography className={classes.error} variant="body1">{t('commonWords.errorMessage')}</Typography>)

}

const Loading = () => {
    const classes = useStyles();
    return (
    <Grid className={classes.loading} alignItems="center" justify="center" container>
        <CircularProgress variant="indeterminate" />
    </Grid>)
}

export default ConfirmationScreen;