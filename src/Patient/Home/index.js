import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import HomePage from './HomePage'
import MedicationFlow from '../MedicationFlow/'
import useStores from '../../Basics/UseStores';

const Home = observer((props) => {

    const {patientUIStore,patientStore,practitionerStore} = useStores();

    if (patientUIStore.onReportFlow) {
        return (<MedicationFlow />)
    } else {
        return (<HomePage />)
    }
});

export default Home;