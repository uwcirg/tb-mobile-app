import React from 'react';
import { observer } from 'mobx-react'
import useStores from '../Basics/UseStores';
import Messages from '../Messaging/PractitionerMessaging'
import PatientsView from './CohortView'
import Home from './Home'
import Settings from './Settings/index'
import PatientProfile from './PatientProfile'
import { Switch, Route } from 'react-router-dom'

const Routes = observer(() => {
    const { practitionerStore, practitionerUIStore } = useStores();

    return (<Switch>
            <Route path="/messaging" children={<Messages />} />
            <Route path="/settings" children={<Settings />} />
            <Route path="/patients/" children={<PatientProfile id={practitionerUIStore.pathNumber} patient={practitionerStore.getPatient(practitionerUIStore.pathNumber)} />} />
            <Route path="/patients" children={<PatientsView />} />
            <Route path="/" children={<Home />} />
        </Switch>);
});

export default Routes;
