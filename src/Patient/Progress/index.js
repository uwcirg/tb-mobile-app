import React, { useEffect, useState } from 'react';
import {makeStyles, Grid, Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DayDrawer from './DayDrawer';
import useStores from '../../Basics/UseStores';
import PreventOffline from '../../Basics/PreventOffline';

import { observer } from 'mobx-react'
import CustomCalendar from './Calendar';
import MedicationFlow from '../ReportingFlows';
import { useTranslation } from 'react-i18next';
import ClickableText from '../../Basics/ClickableText';

import Key from './Key';
import Tabs from './Tabs';
import PhotoList from './PhotoList/';

import QuestionIcon from '@material-ui/icons/HelpOutline';


const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
    },
    keyButton: {
        fontSize: "1em",
        margin: "1em",
        "& > svg": {
            marginRight: "5px",
            fontSize: "1em"
        }
    },
    loading: {
        height: "300px",
        "& p": {
            marginBottom: "1em"
        }
    }

}));

const ReportOldMedication = () => {
    const { patientStore } = useStores();

    useEffect(() => {
        //When the historical report is exited, reset to store a normal day report
        return function cleanup() {
            patientStore.loadDailyReport();
            patientStore.report.isHistoricalReport = false;
        }
    }, [])

    return (<MedicationFlow />)

}

const Progress = observer(() => {

    const [showKey, setShowKey] = useState(false);

    const classes = useStyles();
    const { patientUIStore, patientStore } = useStores();
    const { t } = useTranslation('translation');

    if (patientUIStore.onHistoricalReport) return (<ReportOldMedication />)

    return (
        <div id="intro-progress" className={`${classes.container}`} >
            {showKey && <Key close={() => { setShowKey(false) }} />}
            <ClickableText className={classes.keyButton} icon={<QuestionIcon />} text={t('patient.progress.calendarKey.button')} onClick={() => { setShowKey(true) }} />
            {patientStore.savedReportsLoaded ? <>
                <CustomCalendar />
                <DayDrawer />
            </> : <Loading />}
        </div>)
});

const ProgressPage = observer(() => {
    
    const { t } = useTranslation('translation');
    const { uiStore} = useStores();
    const activeTab = uiStore.pathname === "/progress/photos" ? 1 : 0;

    return (<PreventOffline type={t('patient.tabNames.calendar')}>
        <Tabs content={[<Progress />, <PhotoList />]} activeTab={activeTab} />
    </PreventOffline>)
})

const Loading = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return <Grid className={classes.loading} direction="column" container justify="center" alignItems="center">
        <Typography>{t('patient.progress.loading')}</Typography>
        <CircularProgress variant="indeterminate" />
    </Grid>
}

export default ProgressPage;