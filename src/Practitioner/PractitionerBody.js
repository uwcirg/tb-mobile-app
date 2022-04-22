import React from 'react';
import styled from 'styled-components'
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import Messages from '../Messaging/PractitionerMessaging'
import PatientsView from './CohortView/'
import Home from './Home/'
import Settings from './Settings/index'
import PatientProfile from './PatientProfile/'
import Alert from '../Basics/Alert'
import { Switch, Route } from 'react-router-dom'

const PractitionerBody = observer(() => {
    const { practitionerStore, practitionerUIStore } = useStores();

    return (
        <>
            <Body>
                <Switch>
                    <Route path="/messaging" children={<Messages />} />
                    <Route path="/settings" children={<Settings />} />
                    <Route path="/patients/" children={<PatientProfile id={practitionerUIStore.pathNumber} patient={practitionerStore.getPatient(practitionerUIStore.pathNumber)} />} />
                    <Route path="/patients" children={<PatientsView />} />
                    <Route path="/" children={<Home />} />
                </Switch>
            </Body>
            {practitionerUIStore.alert && <Alert onClose={() => { practitionerUIStore.alert = "" }} text={practitionerUIStore.alert} />}
        </>
    )
});

const Body = styled.div`
width: 100%;
overflow-x: hidden;
`
export default PractitionerBody;
