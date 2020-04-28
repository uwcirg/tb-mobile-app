import React from 'react';
import { observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'
import ReportPhoto from './ReportPhoto'
import ReportPopUp from './ReportPopUp'
import { useTranslation } from 'react-i18next';
import OverTopBar from '../Navigation/OverTopBar'
import useStores from '../../Basics/UseStores';
import { makeStyles } from '@material-ui/core/styles';
import Styles from '../../Basics/Styles'
import Colors from '../../Basics/Colors';
import ReportConfirmation from './ReportConfirmation'
import NumberedTitle from '../Navigation/NumberedTitle'

const useStyles = makeStyles({
    container:{
        marginTop: "1em",
        marginBottom: "60px"
    }
});


const MedicationFlow = observer((props) => {
    const classes = useStyles();
    const { patientStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleBack = () => {

        //If on photo flow exit to home
        if (!patientStore.uiState.onPhotoFlow && patientStore.report.step > 0) {
            patientStore.report.step -= 1;
        } else {
            patientStore.uiState.onTreatmentFlow = false;
            patientStore.uiState.onPhotoFlow = false;
        }
    }

    const advance = () => {
        patientStore.report.step += 1
    }

    let Tabs;

    if(patientStore.isPhotoDay){
        Tabs = [<ReportMedication />, <ReportSymptoms />,<ReportPhoto />,<ReportConfirmation />]
    }else{
        Tabs = [<ReportMedication />, <ReportSymptoms />,<ReportConfirmation />]
    }

    if(patientStore.report.step > Tabs.length - 1){
        patientStore.report.step = Tabs.length - 1
    }

    const tabNumber = (patientStore.uiState.onPhotoFlow ? 3 : patientStore.report.step + 1);
    return (
        <div className={classes.container}>
            <NumberedTitle number={tabNumber} title={patientStore.report.headerText} />
            <OverTopBar title={t("patient.report.title")} handleBack={handleBack} />
           {React.cloneElement(Tabs[patientStore.report.step],{advance: advance})} 
        </div>)
});


export default MedicationFlow;