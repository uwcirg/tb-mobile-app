import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import useStores from './UseStores'
import Alert from './Alert'
import { useTranslation } from 'react-i18next';

const CheckAuthorization = observer(() => {

    const { uiStore, routingStore, loginStore } = useStores();
    const { push } = routingStore;
    const { t } = useTranslation('translation');

    const close = () => {
        uiStore.resetAuthError();
    }

    useEffect(() => {
        if (uiStore.authError) {
            loginStore.deleteCookie();
            loginStore.logout();
            push("")
        }
    }, [uiStore.authError])

    return (<>

        {uiStore.authError && <Alert
            severity="warning"
            position="bottom"
            onClose={close}
            text={<>
                {t('errors.sessionExpired')}
                <br />
                {t('errors.logBackIn')}
            </>}
        />}
    </>
    )

});

export default CheckAuthorization;

