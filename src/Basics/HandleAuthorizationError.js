import React from 'react'
import {observer} from 'mobx-react'
import useStores from './UseStores'
import Alert from './Alert'
import { useTranslation } from 'react-i18next';

const CheckAuthorization = observer(() => {

    const {uiStore, routingStore, loginStore} = useStores();
    const { push } = routingStore;
    const {t} = useTranslation('translation');
    
    const close = () => {
        uiStore.resetAuthError();
    }

    if (uiStore.authError) {
        loginStore.logout();
        push("")
    }

    return (<>
   
    {uiStore.authError && <Alert 
    severity="warning"
    position="bottom"
    onClose={close}
    text={t('errors.sessionExpired')} />}
    </>
    )

});

export default CheckAuthorization;

