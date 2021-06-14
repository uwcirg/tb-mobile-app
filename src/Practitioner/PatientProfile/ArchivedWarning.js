import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useStores from '../../Basics/UseStores'
import PopOver from '../Shared/PopOver'
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core'
import ProfileButton from './ProfileButton'
import Colors from '../../Basics/Colors'


const useStyles = makeStyles({
    bottomButton: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: "2em",
        width: "100%",
        "& > p": {
            marginRight: "auto",
            fontSize: ".9em",
            color: Colors.warningRed,
            maxWidth: "60%"
        }
    },
})

const ArchiveWarningDialog = ({handleClose}) => {

    const { t } = useTranslation('translation');
    const classes= useStyles();

    return (<PopOver title={t('archive.warningTitle')} close={handleClose} ignoreClickAway>
        <Typography>
            {t('archive.warningLong')}
        </Typography>

        <div className={classes.bottomButton}>
            <ProfileButton  onClick={handleClose}>
                {t('patient.report.symptoms.warning.button')}
            </ProfileButton>
        </div>

    </PopOver>)

};

export default ArchiveWarningDialog;