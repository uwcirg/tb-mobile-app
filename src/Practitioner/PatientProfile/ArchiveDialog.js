import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import PopOver from '../Shared/PopOver'
import { Typography } from '@material-ui/core'
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({

})

const ArchiveDialog = () => {

    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientProfileStore } = useStores();

    return (<PopOver title={"Archive Patient"} ignoreClickAway close={patientProfileStore.toggleOnArchive}>
        <Typography variant="body1">
            {t('archive.explanation')}
        </Typography>

    </PopOver>)

}

export default ArchiveDialog;