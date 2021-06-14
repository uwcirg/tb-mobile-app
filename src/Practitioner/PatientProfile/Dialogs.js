import React, { useState } from 'react'
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import AddNote from './AddNote'
import ChangePatientDetails from './ChangePatientDetails'
import ResetPassword from './ResetPassword'
import ArchiveDialog from './ArchiveDialog'
import ArchivedWarning from './ArchivedWarning'


const Dialogs = observer(() => {

    const {practitionerUIStore, patientProfileStore} = useStores();

    if(patientProfileStore.onArchiveWarning) return <ArchivedWarning handleClose={patientProfileStore.closeArchiveWarning } />
    if(patientProfileStore.onArchive) return <ArchiveDialog />
    if(patientProfileStore.onPasswordReset) return <ResetPassword />
    if(practitionerUIStore.onAddPatientNote) return <AddNote />
    if(patientProfileStore.onChangeDetails) return <ChangePatientDetails />
    return <></>

});

export default Dialogs;