import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import Colors from '../../Basics/Colors';

const useStyles = makeStyles({
    container:{
        boxSizing: "border-box",
        padding: "1em",
        backgroundColor: "white",
        width: "100%"
    },
    top: {
        width: "100%",
        padding: ".5em",
        borderBottom: "1px solid gray",
        "& > h2": {
            fontSize: "1.5em"
        }
    },
    green:{
        padding: "5px",
        backgroundColor: Colors.calendarGreen
    }
})

const OneStepReportingUpdate = () => {

    const classes = useStyles();
    const { t } = useTranslation('translation');

    return (<div className={classes.container}>
        <div className={classes.top}>
            <Typography variant="h2">New Feature</Typography>
            <Typography variant="h2">One Step Reporing</Typography>
        </div>
        <Typography variant="body1">{t('oneStepReporting.top')} - </Typography>
        <Typography variant="body1">{t('oneStepReporting.tap')} <span className={classes.green}>{t('oneStepReporting.green')}</span></Typography>
    </div>)

}

export default OneStepReportingUpdate;