import React from 'react'
import {observer} from 'mobx-react'
import useStores from './UseStores'
import Alert from './Alert'

const CheckAuthorization = observer(() => {

    const {uiStore, routingStore, loginStore} = useStores();
    const { push } = routingStore;
    
    const close = () => {
        uiStore.resetAuthError();
    }

    if (uiStore.authError) {
        loginStore.logout();
        push("")
    }

    return (<>
   
    {uiStore.authError && <Alert onClose={close} text={"Your session has expired and you need to log back in"}></Alert>}
    </>
    )

});

export default CheckAuthorization;

