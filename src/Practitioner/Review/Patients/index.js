import React from 'react'
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import PatientCard from './PatientCard'

const PatientOverview = observer(() => {

    const { practitionerStore } = useStores();

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start"}}>
            {practitionerStore.sortedPatientList.length > 0 && practitionerStore.sortedPatientList.map(patient => {
                return <PatientCard key={`patient-overview-${patient.id}`} {...patient} />
            })}
        </div>)

})

export default PatientOverview;