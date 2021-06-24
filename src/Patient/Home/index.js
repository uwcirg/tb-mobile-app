import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'
import HomePage from './HomePage'
import MedicationFlow from '../MedicationFlow/'
import useStores from '../../Basics/UseStores'
import EndOfTreatment from './EndOfTreatment/index'

const Home = observer(() => {

    const {patientUIStore,patientStore,practitionerStore} = useStores();

    if(patientStore.status === "Archived") return <EndOfTreatment />

    if (patientUIStore.onReportFlow) {
        return (<MedicationFlow />)
    } else {
        return (<HomePage />)
    }
});

export default Home;