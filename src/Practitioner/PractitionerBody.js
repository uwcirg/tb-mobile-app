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

    let view = <Home />

    //TODO - convert to react router routes to make more understandble
    // if (practitionerUIStore.onSettings) view = <Settings />
    // if (practitionerUIStore.onMessaging) view = <Messages />
    // if (practitionerUIStore.onPatients) view = <PatientsView />
    // if (practitionerUIStore.onSinglePatient) view = <PatientProfile id={practitionerUIStore.pathNumber} patient={practitionerStore.getPatient(practitionerUIStore.pathNumber)} />



    return (
        <>
            <Body>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/messaging">
                        <Messages />
                    </Route>
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
