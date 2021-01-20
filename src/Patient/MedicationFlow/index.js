import React, {useEffect} from 'react';
import { observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'
import ReportPhoto from './ReportPhoto'
import { useTranslation } from 'react-i18next';
import OverTopBar from '../Navigation/OverTopBar'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import ReportConfirmation from './ReportConfirmation'
import NumberedTitle from '../Navigation/NumberedTitle'
import ReportMood from './ReportMood';
import { DateTime } from 'luxon';

const useStyles = makeStyles({
    container: {
        marginTop: "1em",
        marginBottom: "60px",
        backgroundColor: "white"
    }
});

const MedicationFlow = observer((props) => {
    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    let Tabs;

    if (patientStore.isPhotoDay && !patientUIStore.onHistoricalReport) {
        Tabs = [<ReportMedication />, <ReportSymptoms />, <ReportMood />, <ReportPhoto />]
    } else {
        Tabs = [<ReportMedication />, <ReportSymptoms />, <ReportMood />]
    }

    //Keep confirmation screen for past reports, patients will not be able to review them otherwise
    if(patientUIStore.onHistoricalReport){
        Tabs.push(<ReportConfirmation />)
    }

    const advance = () => {
        if (!patientUIStore.onHistoricalReport ) {
            patientStore.saveReportingState();
        }

        if(patientUIStore.reportStep === Tabs.length - 1){
            patientUIStore.endReport();
            return
        }

        patientUIStore.nextReportStep();
    }

    let step = patientUIStore.reportStep;

    if (step > Tabs.length - 1) {
        step = Tabs.length - 1;
    }

    const handleBack = () => {
        if (patientUIStore.reportStep > Tabs.length - 1) {
            patientUIStore.updateStep(Tabs.length - 2)
            return
        }
        patientUIStore.previousReportStep();
    }

    const tabNumber = (patientStore.uiState.onPhotoFlow ? 3 : step + 1);

    let format = {...DateTime.DATE_SHORT}
    delete format.year;

    const topDateString = DateTime.fromISO(patientStore.report.date).toLocaleString(format)

    return (
        <div className={classes.container}>
            <NumberedTitle number={tabNumber} title={patientStore.report.headerText} />
            <OverTopBar title={patientUIStore.onHistoricalReport ? `${t("report.for")} ${topDateString}` : t("patient.report.title")} handleBack={handleBack} />
            {React.cloneElement(Tabs[step], { advance: advance })}
        </div>)
});


export default MedicationFlow;