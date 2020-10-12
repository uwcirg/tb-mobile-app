import React from 'react'
import {observer} from 'mobx-react'
import useStores from './UseStores'
import Alert from './Alert'

const CheckAuthorization = observer(() => {

    // const { routingStore, practitionerStore, adminStore, patientStore, loginStore, uiStore } = useStores();
    const {uiStore, routingStore, loginStore} = useStores();
    const { push } = routingStore;
    
    // const authError = practitionerStore.authorizationError || patientStore.authorizationError || adminStore.authorizationError;

    // const close = () => {
    //     practitionerStore.authorizationError = false;
    //     patientStore.authorizationError = false;
    //     adminStore.authorizationError = false;
    // }
// {uiStore.authError && <p> Auth error test</p>}

    const close = () => {
        uiStore.authError = false;
    }

    if (uiStore.authError) {
        loginStore.logout();
    }

    return (<>
   
    {uiStore.authError && <Alert onClose={close} text={"Your session has expired and you need to log back in"}></Alert>}
    </>
    )

});

export default CheckAuthorization;

