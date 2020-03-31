import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles';
import { observer } from 'mobx-react';
import useStores from '../../Basics/UseStores';
import { useTranslation } from 'react-i18next'
import SimpleButton from '../../Basics/SimpleButton';
import PatientReport from '../../Basics/PatientReport';


const useStyles = makeStyles({
    superContainer:{
        marginBottom: "1em"
    }
})

const ReportConfirmation = observer(() => {

    const classes = useStyles();
    const { patientStore } = useStores();
    patientStore.report.headerText = "Confirm and Submit"

    return (
        <div className={classes.superContainer}>
            <PatientReport
                timeTaken={patientStore.report.timeTaken}
                selectedSymptoms={patientStore.report.selectedSymptoms}
                photoString={patientStore.report.photoString}
                isPhotoDay={patientStore.isPhotoDay}

             />
            <SimpleButton alignRight onClick={patientStore.submitReport}>Confirm and Submit</SimpleButton>
        </div>
    )

});


export default ReportConfirmation;
