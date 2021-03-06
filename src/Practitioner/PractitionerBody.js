import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import Messages from '../Messaging/PractitionerMessaging'
import PatientsView from './CohortView/'
import Home from './Home/'
import Settings from './Settings/index'
import PatientProfile from './PatientProfile/'
import Review from './Review';
import Alert from '../Basics/Alert'


const PractitionerBody = observer(() => {
    const { practitionerStore, routingStore, practitionerUIStore,messagingStore } = useStores();
    const { location, push, goBack } = routingStore;
    const { t, i18n } = useTranslation('translation');

    //Handle Patient Link
    const handlePatientClick = (id) => {
        push(`/patients/${id}`)
    }

    useEffect(()=>{
        messagingStore.getUnreadMessages();
    },[])

    let view = <Home />

    if (practitionerUIStore.onSettings) view = <Settings />
    if (practitionerUIStore.onMessaging) view = <Messages />
    if (practitionerUIStore.onPatients) {
        view = <PatientsView
            patientList={practitionerStore.patientList}
            tempList={practitionerStore.temporaryPatients}
            handlePatientClick={handlePatientClick} />
    }
    if (practitionerUIStore.onSinglePatient) view = <PatientProfile id={practitionerUIStore.pathNumber} patient={practitionerStore.getPatient(practitionerUIStore.pathNumber)} />
    if (practitionerUIStore.onReview) view = <Review />

    return (
        <>
        <Body>
            {view}
        </Body>
        {practitionerUIStore.alert && <Alert onClose={()=>{practitionerUIStore.alert = ""}} text={practitionerUIStore.alert} />}
        </>
    )
});

const Body = styled.div`
width: 100%;
overflow-x: hidden;
`
export default PractitionerBody;
