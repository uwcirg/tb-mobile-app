import React from 'react'
import useStores from '../../../Basics/UseStores';
import { observer } from 'mobx-react'
import AddNote from './AddNote'
import ChangePatientDetails from './ChangePatientDetails'
import ResetPassword from './ResetPassword'
import ArchiveDialog from './ArchiveDialog'
import ArchivedWarning from './ArchivedWarning'
import { useHistory, useParams } from 'react-router-dom'

import { Switch, Route } from 'react-router-dom'

const Dialogs = observer(() => {

    const { patientProfileStore } = useStores();

    const history = useHistory();
    const {id: patientId} = useParams();

    if (patientProfileStore.onArchiveWarning) return <ArchivedWarning handleClose={patientProfileStore.closeArchiveWarning} />

    const handleClose = () => {
        history.push(`/patients/${patientId}`)
    }

    return (
        <Switch>
            <Route path="/patients/:id/archive">
                <ArchiveDialog handleClose={handleClose} />
            </Route>
            <Route path="/patients/:id/reset-password">
                <ResetPassword handleClose={handleClose} />
            </Route>
            <Route path="/patients/:id/add-note">
                <AddNote handleClose={handleClose} />
            </Route>
            <Route path="/patients/:id/edit">
                <ChangePatientDetails handleClose={handleClose} />
            </Route>
            <Route path="/patients/:id/add-appointment">
                <p>TODO - add appointment UI</p>
            </Route>
        </Switch>)

});

export default Dialogs;