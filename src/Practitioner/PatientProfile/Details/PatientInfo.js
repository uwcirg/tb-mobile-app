import React from 'react';
import SectionLabel from '../../../Components/SectionLabel';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import { useTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import { DateTime } from 'luxon';
import Styles from '../../../Basics/Styles';
import ProgressVis from './ProgressVis';
import Item from './Item';

const useStyles = makeStyles({

    container: {
        ...Styles.flexRow,
        backgroundColor: "white",
        padding: "1em"
    },
    detailGroup: {
        flexGrow: 1,
        display: "flex",
        flexWrap: "true",
        width: "100%",
        "& > div": {
            marginRight: "2em"
        },
        marginBottom: "1em"
    },
    details: {
        flex: '1 1 0'
    },
    fullWidth: {
        width: "100%",
        marginBottom: "1em"
    },
    capitalize:{
        "& > *":{
            textTransform: "capitalize"
        }
    }

})

const PatientInfo = observer(() => {

    const classes = useStyles();
    const { patientProfileStore } = useStores();
    const { t } = useTranslation('translation');

    const getDate = (iso) => {
        return (DateTime.fromISO(iso).toLocaleString({ day: 'numeric', month: 'short' }))
    }

    const survey = patientProfileStore.selectedPatient.details.contactTracingSurvey;

    const householdTestingText = survey ? <>
        {`${survey.numberOfContactsTested} / ${survey.numberOfContacts} 
        ${t('householdTesting.membersTested')} - ${t('householdTesting.updated')} ${getDate(survey.createdAt)}`}
    </> : t('householdTesting.noResponse')

    return (<div className={classes.container}>
        <div className={classes.details}>
            <SectionLabel className={classes.fullWidth}>{t('coordinator.patientProfile.details.progress')}</SectionLabel>
            <ProgressVis />
            <SectionLabel className={classes.fullWidth}>{t('coordinator.patientTableLabels.details')}</SectionLabel>
            <div className={classes.detailGroup}>
                <Item top={t("coordinator.patientProfile.age")} bottom={patientProfileStore.selectedPatient.details.age || "N/A"} />
                <Item top={t("coordinator.patientProfile.gender")} bottom={patientProfileStore.selectedPatient.details.gender || "N/A"} />
                <Item top={t("coordinator.patientProfile.lastContacted")} bottom={getDate(patientProfileStore.selectedPatient.details.lastContacted)} />
            </div>
            <Item className={classes.capitalize} top={t("householdTesting.title")} bottom={householdTestingText} />
        </div>
    </div>)

})

export default PatientInfo;