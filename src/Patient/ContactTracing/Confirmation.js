import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Colors from '../../Basics/Colors';
import NextButton from './NextButton';


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


const ConfirmationScreen = ({ nContacts, nTested, error, handleNext }) => {


    const completed = nTested >= nContacts;
    const { uiStore, patientStore } = useStores();
    const classes = useStyles();
    const { t } = useTranslation('translation');

    const completeSurvey = () => {
        uiStore.push("/");
        patientStore.initalize();
    }

    return (
        <>
        <Grid container className={classes.body} direction="column" justify="center" align="center">
            <Typography variant="body1" color="initial">
                Thanks for letting us know!
            </Typography>
            <Typography variant="body1" color="initial">
                {completed ? "It is great that all of your contacts have been tested. Keep up the great work." :
                    <>
                        Its very important for the health of your loved ones to ensure that they all get tested for TB. 
                        <br />
                        <br />
                        <span style={{backgroundColor: Colors.highlightYellow}}>Please reach out to your treatment assistant to set up testing</span>
                    </>}
            </Typography>
        </Grid>
        <NextButton onClick={handleNext} text="Complete" />
        </>

    )
}

export default ConfirmationScreen;