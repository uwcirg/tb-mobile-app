import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import Colors from '../Basics/Colors';
import AddPatientPrompt from './AddPatientPrompt'
import AddPatientFlow from './AddPatientFlow'
import Messages from '../Messaging/PractitionerMessaging'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PatientsView from './CohortView/'
import PhotoList from './PhotoView'
import Home from './Home/'
import Settings from './Settings'

import PatientProfile from './PatientProfile/'

const PractitionerBody = observer(() => {
    const { practitionerStore, routingStore } = useStores();
    const { location, push, goBack } = routingStore;
    const { t, i18n } = useTranslation('translation');

    //Handle Patient Link
    const handlePatientClick = (id) => {
        push(`/patients/${id}`)
    }

    let patientsPath;

    if (location.pathname.startsWith("/patients/")) {

        if (location.pathname === "/patients/add") {
            patientsPath = <AddPatientFlow />
        } else {
            const parts = location.pathname.split("/");
            const id = parts[2];

            patientsPath = <PatientProfile id={id} patient={practitionerStore.getPatient(id)} />
        }
    } else {
        patientsPath = ""
    }

    return (
        <Body>
            {location.pathname.startsWith("/settings") && <Settings />}
            {location.pathname.startsWith("/home") && <Home />}
            {location.pathname === "/photos" && <PhotoList />}
            {location.pathname === "/photos/historical" && <PhotoList processed />}
            {location.pathname.startsWith("/messaging") && <Messages />}
            {location.pathname === "/patients" && <PatientsView
                patientList={practitionerStore.patientList}
                tempList={practitionerStore.temporaryPatients}
                handlePatientClick={handlePatientClick}
            />}
            {patientsPath}

        </Body>
    )
});

const Body = styled.div`
width: 100%;

`

export default PractitionerBody;
