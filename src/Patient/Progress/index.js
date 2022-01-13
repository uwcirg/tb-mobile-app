import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DayDrawer from './DayDrawer';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import CustomCalendar from './Calendar';
import MedicationFlow from '../ReportingFlows';
import { useTranslation } from 'react-i18next';
import ClickableText from '../../Basics/ClickableText';
import QuestionIcon from '@material-ui/icons/HelpOutline';
import Key from './Key';
import PreventOffline from '../../Basics/PreventOffline';
import Grid from '@material-ui/core/Grid';
import Tabs from './Tabs';
import PhotoList from './PhotoList/';

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
    const { patientStore, patientUIStore } = useStores();
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

    return (<div id="intro-progress" className={`${classes.container}`} >
        {showKey && <Key close={() => { setShowKey(false) }} />}
        <ClickableText className={classes.keyButton} icon={<QuestionIcon />} text={t('patient.progress.calendarKey.button')} onClick={() => { setShowKey(true) }} />
        {patientStore.savedReportsLoaded ? <>
            <CustomCalendar />
            <DayDrawer />
        </> : <Loading />}
    </div>)
});

const WrappedProgress = () => {
    const { t } = useTranslation('translation');
    return (<PreventOffline type={t('patient.tabNames.calendar')}>
        <Progress />
    </PreventOffline>)
}

const ProgressWithOfflineOverride = observer(() => {

    const [activeTab, setTab] = useState(0);
    const {photoReports} = useStores().patientStore;

    return <Tabs content={[<WrappedProgress />, <PhotoList initalPhotos={photoReports} />]} activeTab={activeTab} setTab={setTab} />
})

const Loading = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    return <Grid className={classes.loading} direction="column" container justify="center" alignItems="center">
        <Typography>{t('patient.progress.loading')}</Typography>
        <CircularProgress variant="indeterminate" />
    </Grid>
}

export default ProgressWithOfflineOverride;