import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import HomePage from './HomePage'
import MedicationFlow from '../MedicationFlow/'

const Home = inject("uiStore", "patientStore")(observer(({ uiStore, patientStore, props }) => {

    if(patientStore.onTreatmentFlow){
        return (<MedicationFlow/>)
    }else{
        return (<HomePage />)
    }
}));

export default Home;