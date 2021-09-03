import React from 'react';
import MissedActionCard from './MissedActionCard';
import { useTranslation } from 'react-i18next';
import ButtonLayout from './ButtonLayout';
import Typography from '@material-ui/core/Typography';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core/styles';
import useToggle from '../../../Hooks/useToggle';
import Grow from '@material-ui/core/Collapse';
import NewButton from '../../../Basics/NewButton';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

const useStyles = makeStyles({
    card: {
        marginBottom: ".5em"
    },
    body: {
        padding: ".75em",
        "& > button, & > a": {
            fontWeight: "normal",
            margin: ".5em 0",
            width: "100%",
            boxSizing: "border-box"
        }
    }
})

const SurveyCard = ({ setHidden }) => {

    const classes = useStyles();
    const { t } = useTranslation('translation');
    const [showDetails, toggleShowDetails] = useToggle();
    const link = window._env.REDCAP_EOT_SURVEY_LINK || "";

    return (
        <MissedActionCard>
            <ButtonLayout
                text={t('archive.patientSide.surveyButton')}
                isDropdownOpen={showDetails}
                onClick={toggleShowDetails}
                icon={<ListAltIcon />}
            />
            <Grow in={showDetails} className={classes.grow}>
                <div className={classes.body}>
                    <Typography variant="body1">{t('archive.patientSide.survey')}</Typography>
                    <NewButton href={link} icon={<ListAltIcon />} text={t('appSurvey.goToSurvey')} />
                    <NewButton onClick={setHidden} icon={<AssignmentTurnedInIcon />} positive text={t('appSurvey.markAsCompleted')} />
                </div>
            </Grow>

        </MissedActionCard>)
}

export default SurveyCard;