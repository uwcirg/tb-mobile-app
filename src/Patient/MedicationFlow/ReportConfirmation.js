import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import SimpleButton from '../../Basics/SimpleButton';
import PatientReport from '../../Basics/PatientReport';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
    superContainer:{
        marginBottom: "1em"
    }
})

const ReportConfirmation = observer(() => {

    const classes = useStyles();
    const { patientStore,patientUIStore} = useStores();
    const { t, i18n } = useTranslation('translation');
    
    patientStore.report.headerText = t("patient.report.confirmation.title")

    const handleSubmit = () => {
        patientStore.submitReport();
        patientUIStore.endReport();
    }

    return (
        <div className={classes.superContainer}>
            <PatientReport
                medicationTaken={patientStore.report.tookMedication}
                timeTaken={patientStore.report.timeTaken}
                selectedSymptoms={patientStore.report.selectedSymptoms}
                photoString={patientStore.report.photoString}
                isPhotoDay={patientStore.isPhotoDay}
             />
            <SimpleButton alignRight onClick={handleSubmit}>{t("patient.report.confirmation.title")}</SimpleButton>
        </div>
    )

});


export default ReportConfirmation;
