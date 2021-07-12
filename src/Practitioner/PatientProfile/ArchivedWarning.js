import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PopOver from '../Shared/PopOver';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import ProfileButton from './ProfileButton';
import Colors from '../../Basics/Colors';
import CopyableText from '../../Utility/CopyLink'

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
    surveyArea:{
        marginTop: "1em"
    },
    copyOverride:{
     margin: "1em 0"
    }
})

const ArchiveWarningDialog = ({ handleClose }) => {

    const { t } = useTranslation('translation');
    const classes = useStyles();

    return (<PopOver title={t('archive.warningTitle')} close={handleClose} ignoreClickAway>
        <Typography>{t('archive.warningLong')}</Typography>
        <SurveyLink />
        <div className={classes.bottomButton}>
            <ProfileButton onClick={handleClose}>
                {t('patient.report.symptoms.warning.button')}
            </ProfileButton>
        </div>
    </PopOver>)

};

const SurveyLink = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const link = window._env.REDCAP_EOT_SURVEY_LINK || "";

    return (
        <div className={classes.surveyArea}>
            <Typography variant="body1" color="initial">{t('archive.surveyText')}</Typography>
            <CopyableText className={classes.copyOverride} text={link} />
        </div>
    )
}

export default ArchiveWarningDialog;