import React from 'react';
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
            textAlign: "left"
        }
    }
})

const ConfirmationScreen = ({ nContacts, nTested, wasError, handleNext }) => {

    const { uiStore, patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const completeSurvey = () => {
        uiStore.push("/");
        patientStore.initalize();
    }

    const completed = nTested >= nContacts;

    const body = wasError ? <Error /> : <Success completed />

    return (
        <>
            {body}
            <NextButton onClick={handleNext} text={t('archive.complete')} />
        </>
    )
}

const Success = ({ completed }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (
        <Grid container className={classes.body} direction="column" justify="center" align="center">
            <Grid container alignItems="center">
                <Check style={{ color: Colors.green, marginRight: ".5em" }} />
                <Typography>{t('householdTesting.recorded')}</Typography>
            </Grid>

            <Typography variant="body1" color="initial">
                {t('householdTesting.thanks')}
            </Typography>
            <Typography variant="body1" color="initial">
                {!completed ? "It is great that all of your contacts have been tested. Keep up the great work." :
                    <>
                        <Typography variant="body1" color="initial">Its very important for the health of your loved ones to ensure that they all get tested for TB.</Typography>
                        <Typography style={{ backgroundColor: Colors.highlightYellow }}>{t('householdTesting.reachOut')}</Typography>
                    </>}
            </Typography>
        </Grid>
    )
}

const Error = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<div></div>)

}

export default ConfirmationScreen;