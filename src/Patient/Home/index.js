import React from 'react'
import { observer } from 'mobx-react'
import HomePage from './HomePage'
import MedicationFlow from '../MedicationFlow/'
import useStores from '../../Basics/UseStores'
import EndOfTreatment from './EndOfTreatment/index'

const Home = observer(() => {

    const {patientUIStore,patientStore } = useStores();

    if(patientStore.status === "Archived") return <EndOfTreatment />

    if (patientUIStore.onReportFlow) {
        return (<MedicationFlow />)
    } else {
        return (<HomePage />)
    }
});

export default Home;