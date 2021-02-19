import React from 'react'
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import PatientCard from './PatientCard'

const PatientOverview = observer(() => {

    const { practitionerStore } = useStores();

    return (<div>

        {practitionerStore.patientList.length > 0 && practitionerStore.patientList.map(patient => {
            return <PatientCard key={`patient-overview-${patient.id}`} {...patient} />
        })}

    </div>)

})


export default PatientOverview;