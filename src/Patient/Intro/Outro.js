import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Information from '@material-ui/icons/InfoRounded'


const useStyles = makeStyles({

})

const Outro = () => {
    const { t, i18n } = useTranslation('translation');
    const classes = useStyles();

    return (<>
        <div>
            <h2>{t('outro.header')} 👍</h2>
            <p>{t('outro.one')}</p>
        </div>
    </>)

}

export default Outro;