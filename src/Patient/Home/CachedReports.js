import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import FinishedIcon from '@material-ui/icons/CheckCircle';
import Colors from '../../Basics/Colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    container: {
        margin: "auto 1em auto 1em",
        width: "80%",
    },
    message: {
        textAlign: "center",
        padding: 0
    },
    progressVisual: {


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

    useEffect(() => {
        dailyReportStore.getCachedReports();
    }, [patientStore.lastSubmission]);

    useEffect(() => {
        if (!uiStore.offline && dailyReportStore.finished) {
            patientStore.getReports();
        }
    }, [dailyReportStore.finished])

    return (<div className={classes.container}>
        {!uiStore.offline && dailyReportStore.finished ? <div className={classes.finished}>
            {t('patient.report.offline.allDone')} <FinishedIcon style={{ color: Colors.approvedGreen, marginLeft: "5px" }} />
        </div> : <>
                {dailyReportStore.syncing && <LinearProgress
                    className={classes.progressVisual}
                />}
                {!dailyReportStore.syncing && dailyReportStore.numberOfflineReports > 0 && <p className={classes.message}>
                    {t('patient.report.offline.youHave')} {dailyReportStore.numberOfflineReports} {t('patient.report.offline.report', { count: dailyReportStore.numberOfflineReports })}. {t('patient.report.offline.explanation')}</p>}
                {dailyReportStore.syncing && <p className={classes.message}>{t('patient.report.offline.uploading')}... </p>}
            </>}
    </div>)

})

export default CachedReports;