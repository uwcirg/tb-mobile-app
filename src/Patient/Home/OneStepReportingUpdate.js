import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Button, Typography } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import HomePageSection from '../../Basics/HomePageSection';
import Grid from '@material-ui/core/Grid'
import { Stars } from '@material-ui/icons';


const useStyles = makeStyles({
    card: {
        padding: "1em"
    },
    container: {
        boxSizing: "border-box",
        width: "100%"
    },
    top: {
        borderBottom: "1px solid gray",
        paddingBottom: ".5em",
        "& > div > h2": {
            fontSize: "1.25em"
        }
    },
    green: {
        padding: "2px 5px",
        backgroundColor: Colors.calendarGreen,
        borderRadius: "4px"
    },
    star: {
        color: Colors.buttonBlue,
        fontSize: "2em",
    },
    yellow: {
        padding: "2px 5px",
        backgroundColor: Colors.highlightYellow,
        borderRadius: "4px"
    },
    body: {
    }
})

const OneStepReportingUpdate = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (
        <HomePageSection className={classes.card}>
            <div className={classes.container}>
                <Grid alignItems="center" container wrap="nowrap" className={classes.top} >
                    <Stars className={classes.star} />
                    <Box width=".5em" />
                    <div>
                        <Typography variant="h2">{t('oneStepReporting.newFeature')}:</Typography>
                        <Typography variant="h2">{t('oneStepReporting.oneStep')}</Typography>
                    </div>
                </Grid>
                <div className={classes.body}>
                    <Box height=".5em" />
                    <Typography variant="body1">{t('oneStepReporting.top')} - </Typography>
                    <Typography variant="body1">{t('oneStepReporting.tap')} <span className={classes.green}>{t('oneStepReporting.greenButton')}</span></Typography>
                    <Box height=".5em" />
                    <Typography variant="body1">{t('oneStepReporting.needHelp')} - </Typography>
                    <Typography variant="body1">{t('oneStepReporting.tap')} <span className={classes.yellow}>{t('oneStepReporting.yellowButton')}</span></Typography>
                    <Box height=".5em" />
                    <Typography variant="body1">{t('oneStepReporting.homeScreen')}</Typography>
                </div>
                <Grid container style={{ width: "100%" }} justify="flex-end">
                    <Button variant="outlined">Okay</Button>
                </Grid>
            </div>
        </HomePageSection>
    )

}

export default OneStepReportingUpdate;