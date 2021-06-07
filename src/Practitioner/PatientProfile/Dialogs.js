import React from 'react'
import useStores from '../../Basics/UseStores';
import {observer} from 'mobx-react'
import AddNote from './AddNote'
import ChangePatientDetails from './ChangePatientDetails'
import ResetPassword from './ResetPassword'

const Dialogs = observer(() => {

    const {practitionerUIStore, patientProfileStore} = useStores();

    if(patientProfileStore.onPasswordReset) return <ResetPassword />
    if(practitionerUIStore.onAddPatientNote) return <AddNote />
    if(patientProfileStore.onChangeDetails) return <ChangePatientDetails />
    return <></>

});

export default Dialogs;