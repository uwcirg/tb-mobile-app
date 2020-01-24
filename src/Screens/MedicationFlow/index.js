import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import ReportMedication from './ReportMedication'
import ReportSymptoms from './ReportSymptoms'

const MedicationFlow = inject("patientStore")(observer(({patientStore}) => {
    return(Tabs[patientStore.medicationStep])
}));

const Tabs = [<ReportMedication />, <ReportSymptoms />,<div>test</div>]


export default MedicationFlow;