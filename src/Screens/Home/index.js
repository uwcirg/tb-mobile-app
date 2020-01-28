import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import Progress from './Progress'
import MedicationFlow from '../MedicationFlow/'

const Home = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    if(uiStore.onTreatmentFlow){
        return (<MedicationFlow/>)
    }else{
        return (<Progress />)
    }
}));

export default Home;