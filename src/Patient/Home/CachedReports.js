import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import FinishedIcon from '@material-ui/icons/CheckCircle';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid'
import { WifiOff } from '@material-ui/icons';
import { Box } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        padding: "1em 1.5em",
        width: "100%",
        boxSizing: "border-box"
    },
    message: {
        padding: 0
    },
    finished: {
        display: "flex",
        alignItems: "center",
        margin: "1em 0 1em 0"
    }
})

const CachedReports = observer(() => {
    const classes = useStyles();
    const { patientStore, dailyReportStore, uiStore } = useStores();
    const { t } = useTranslation('translation');

    const shouldRender = (!uiStore.offline && dailyReportStore.finished) || (dailyReportStore.syncing) || (!dailyReportStore.syncing && dailyReportStore.numberOfflineReports > 0)

    useEffect(() => {
        dailyReportStore.getCachedReports();
    }, [patientStore.lastSubmission]);

    useEffect(() => {
        if (!uiStore.offline && dailyReportStore.finished) {
            patientStore.getReports();
        }
    }, [dailyReportStore.finished])

    return (
        <>
            {shouldRender && <div className={classes.container}>
                {!uiStore.offline && dailyReportStore.finished ? <div className={classes.finished}>
                    {t('patient.report.offline.allDone')} <FinishedIcon style={{ color: Colors.approvedGreen, marginLeft: "5px" }} />
                </div> : <>
                    {dailyReportStore.syncing && <LinearProgress
                        className={classes.progressVisual}
                    />}
                    {!dailyReportStore.syncing && dailyReportStore.numberOfflineReports > 0 &&
                        <OfflineMessage />}
                    {dailyReportStore.syncing && <p className={classes.message}>{t('patient.report.offline.uploading')}... </p>}
                </>}
            </div>}
        </>
    )

})

const OfflineMessage = observer(() => {

    const classes = useStyles();
    const { dailyReportStore } = useStores();
    const { t } = useTranslation('translation');

    return (<Grid style={{ boxSizing: "border-box" }} alignItems="center" wrap="nowrap" container>
        <WifiOff style={{ color: Colors.blue, paddingRight: "1em" }} />
        <p className={classes.message}>
            {t('patient.report.offline.youHave')} {dailyReportStore.numberOfflineReports} {t('patient.report.offline.report', { count: dailyReportStore.numberOfflineReports })}. {t('patient.report.offline.explanation')}
        </p>
    </Grid>)

});

export default CachedReports;