import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Information from '@material-ui/icons/InfoRounded'


const useStyles = makeStyles({

})

const Welcome = () => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return (<>
        <div>
            <h1>{t('patient.walkthrough.welcome.header')} 🎉</h1>
            <p>{t('patient.walkthrough.welcome.one')}</p>
            <p>{t('patient.walkthrough.welcome.two')}</p>
        </div>
    </>)

}

export default Welcome;