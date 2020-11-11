import React from 'react'
import { useTranslation } from 'react-i18next';

const Welcome = () => {
    const { t } = useTranslation('translation');

    return (<>
        <div>
            <h1>{t('patient.walkthrough.welcome.header')} 🎉</h1>
            <p>{t('patient.walkthrough.welcome.one')}</p>
            <p>{t('patient.walkthrough.welcome.two')}</p>
        </div>
    </>)

}

export default Welcome;