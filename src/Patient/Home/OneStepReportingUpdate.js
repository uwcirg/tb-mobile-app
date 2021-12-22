import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, Typography, Collapse } from '@material-ui/core';
import Colors from '../../Basics/Colors';
import HomePageSection from '../../Basics/HomePageSection';
import Grid from '@material-ui/core/Grid'
import { Clear, Stars } from '@material-ui/icons';
import useLocalValue from '../../Hooks/useLocalValue';


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
    button: {
        textTransform: "capitalize"
    }
})

const OneStepReportingUpdate = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    const [hide,setHide] = useLocalValue('hideOneStepAlert',true);

    const handleClick = () => {
        setHide(true);
    }

    return (
        <Collapse enter={false} timeout={1000} in={!hide}>
        <HomePageSection upperText={<><Stars /> {t('oneStepReporting.newFeature')}</>} className={classes.card}>
            <div className={classes.container}>
                <Grid alignItems="center" container wrap="nowrap" className={classes.top} >
                    <Stars className={classes.star} />
                    <Box width="1em" />
                    <div>
                        <Typography variant="h2">{t('oneStepReporting.newFeature')}:</Typography>
                        <Typography variant="h2">{t('oneStepReporting.oneStep')}</Typography>
                    </div>
                    <IconButton onClick={handleClick} style={{marginLeft: "auto", alignSelf: "flex-start", padding: 0}}>
                        <Clear />
                    </IconButton>
                </Grid>
                <div className={classes.body}>
                    <Box height="1em" />
                    <Typography variant="body1">{t('oneStepReporting.top')} - </Typography>
                    <Typography variant="body1">{t('oneStepReporting.tap')} <span className={classes.green}>{t('oneStepReporting.greenButton')}</span></Typography>
                    <Box height=".5em" />
                    <Typography variant="body1">{t('oneStepReporting.needHelp')} - </Typography>
                    <Typography variant="body1">{t('oneStepReporting.tap')} <span className={classes.yellow}>{t('oneStepReporting.yellowButton')}</span></Typography>
                    <Box height=".5em" />
                    <Typography variant="body1">{t('oneStepReporting.homeScreen')}</Typography>
                </div>
                <Grid container style={{ width: "100%" }} justify="flex-end">
                    <Button onClick={handleClick} className={classes.button} variant="outlined">{t('patient.report.symptoms.warning.button')}</Button>
                </Grid>
            </div>
        </HomePageSection>
        </Collapse>
    )

}

export default OneStepReportingUpdate;