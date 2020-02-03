import React from 'react';
import { inject, observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'
import ReportPhoto from './ReportPhoto'
import ReportConfirmation from './ReportConfirmation'
import CircularLabel from '../../Basics/CircularLabel'
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import ChevronLeft from '@material-ui/icons/ChevronLeftOutlined';

const MedicationFlow = inject("patientStore")(observer(({patientStore}) => {


    const Tabs = [<ReportMedication />, <ReportSymptoms />,<ReportPhoto />, <ReportConfirmation />]
    const { t, i18n } = useTranslation('translation');
    const titles = [t("report.medicationTitle"),t("report.symptomsTitle"),t("report.photoTitle")]

    const handleBack = () => {
        patientStore.medicationStep -= 1;
    }

    return(
        <div>

        <StatusBar>
            <CircularLabel number={patientStore.medicationStep + 1} />
            <span>{titles[patientStore.medicationStep]}</span>
            {/* patientStore.medicationStep == 0 ? "" : <ChevronLeft onClick={handleBack} /> */}
        </StatusBar>

        {Tabs[patientStore.medicationStep]}
        </div>
        )
}));

const StatusBar = styled.div`
display: flex;
align-items: center;

& > span{
    
}

svg{
    background-color: lightgray;
}
`


export default MedicationFlow;