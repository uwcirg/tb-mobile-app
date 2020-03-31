import React from 'react'
import { DateTime } from 'luxon';
import NewButton from '../../Basics/NewButton';
import Clipboard from '@material-ui/icons/Assignment'
import Camera from '@material-ui/icons/CameraAlt';
import InteractionCard from './InteractionCard';
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import { useTranslation } from 'react-i18next';

const ActionBox = observer(() => {

    const {patientStore} = useStores();
    const { t, i18n } = useTranslation('translation');

    const handleReportClick = () =>{
        patientStore.uiState.onTreatmentFlow = true;
    }

    const handlePhotoClick = () =>{
        patientStore.uiState.onTreatmentFlow = true;
        patientStore.uiState.onPhotoFlow = true;
    }

    return(
        <InteractionCard upperText={t("patient.home.todaysActions.title")}>
            <NewButton positive={patientStore.report.hasSubmitted} onClick={handleReportClick} icon={<Clipboard />} text={t("patient.home.todaysActions.logMedication")} />
            {patientStore.isPhotoDay && <NewButton positive={patientStore.report.hasSubmittedPhoto} onClick={handlePhotoClick} icon={<Camera />} text={t("patient.home.todaysActions.uploadPhoto")} />} 
        </InteractionCard>)
});

export default ActionBox;