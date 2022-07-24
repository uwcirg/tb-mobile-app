import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useStores from '../../../Basics/UseStores';
import HomePageSectionContainer from '../../../Components/Patient/HomePageSectionContainer';
import ContactTracingCard from './HouseholdTestingCard';
import WarningIcon from '@material-ui/icons/Warning';
import MissedReports from './MissedReports';
import MissedPhoto from './MissedPhoto';
import SurveyCard from './SurveyCard';
import useLocalValue from '../../../Hooks/useLocalValue';
import RedoPhoto from './RedoPhoto';
import isIndonesiaPilot from '../../../Utility/check-indonesia-flag';

const RequiresAction = observer(() => {

    const { t } = useTranslation('translation');
    const { patientStore, uiStore } = useStores();

    const [surveyHidden, setSurveyHidden] = useLocalValue("appSurveyHidden", true);

    const shouldShowRedoPhoto = patientStore.eligibleForRedoPhoto;
    const shouldShowMissedPhoto = patientStore.eligibleForBackPhoto;
    const shouldShowContactTracing = patientStore.contactTracingNeeded;
    const shouldShowMissedReports = patientStore.missingReports.length > 0;
    const shouldShowAppSurvey = (patientStore.patientInformation.weeksInTreatment >= 20 && !surveyHidden) && !isIndonesiaPilot();

    const shouldRender = !uiStore.offline && (shouldShowMissedReports || shouldShowContactTracing || shouldShowMissedPhoto || shouldShowAppSurvey || shouldShowRedoPhoto);

    return (
        <>
            {shouldRender && <HomePageSectionContainer upperText={<><WarningIcon />{t('patient.home.cardTitles.actionNeeded')}</>}>
                {shouldShowRedoPhoto && <RedoPhoto />}
                {shouldShowAppSurvey && <SurveyCard setHidden={() => {setSurveyHidden(true)}} />}
                {shouldShowMissedPhoto && <MissedPhoto />}
                {shouldShowMissedReports && <MissedReports />}
                {shouldShowContactTracing && <ContactTracingCard />}
            </HomePageSectionContainer>}
        </>
    )
});

export default RequiresAction;