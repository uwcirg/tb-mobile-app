import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import HomePage from './HomePage'
import MedicationFlow from '../MedicationFlow/'
import useStores from '../../Basics/UseStores';

const Home = observer((props) => {

    const { uiStore, patientStore, routingStore } = useStores();
    const { location, push, goBack } = routingStore;

    if (location.pathname.startsWith("/patient/home/report")) {
        return (<MedicationFlow />)
    } else {
        return (<HomePage />)
    }
});

export default Home;