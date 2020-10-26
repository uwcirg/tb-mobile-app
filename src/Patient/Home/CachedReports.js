import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react'
import LinearProgress from '@material-ui/core/LinearProgress';
import FinishedIcon from '@material-ui/icons/CheckCircle';
import Colors from '../../Basics/Colors';
import { autorun } from 'mobx';

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

    useEffect(() => {
        dailyReportStore.getCachedReports();
    }, [])


    useEffect(() => {
        dailyReportStore.getCachedReports();
    }, [patientStore.lastSubmission]);

    return (<div className={classes.container}>
        {!uiStore.offline && dailyReportStore.finished ? <div className={classes.finished}>
            All offline reports have submitted <FinishedIcon style={{ color: Colors.approvedGreen, marginLeft: "5px" }} />
        </div> : <>
                {dailyReportStore.syncing && <LinearProgress className={classes.progressVisual} />}
                {!dailyReportStore.syncing && dailyReportStore.numberOfflineReports > 0 && <p className={classes.message}>You completed {dailyReportStore.numberOfflineReports} offline that can be uploaded when you have an internet connection</p>}
                {dailyReportStore.syncing && <p className={classes.message}>Uploading your offline reports</p>}
            </>}
    </div>)

})

export default CachedReports;