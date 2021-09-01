import React from 'react';
import MissedActionCard from './MissedActionCard';
import { useTranslation } from 'react-i18next';
import ButtonLayout from './ButtonLayout';
import Typography from '@material-ui/core/Typography';
import useStores from '../../../Basics/UseStores';
import ListAltIcon from '@material-ui/icons/ListAlt';

const SurveyCard = () => {
    const { t } = useTranslation('translation');
    const {uiStore} = useStores();
    const link = window._env.REDCAP_EOT_SURVEY_LINK || "";

    const handleClick = () => {
        uiStore.push("/app-survey");
    }

    return (
        <MissedActionCard>
            <ButtonLayout
                onClick={handleClick}
                text={t('archive.patientSide.surveyButton')}
                icon={<ListAltIcon />}
                />
            <Typography style={{padding: "1em"}} variant="body1" color="initial">{t('archive.patientSide.survey')}</Typography>
        </MissedActionCard>)
}

export default SurveyCard;