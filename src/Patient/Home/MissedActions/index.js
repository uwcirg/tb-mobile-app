import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useStores from '../../../Basics/UseStores';
import HomePageSectionContainer from '../../../Components/Patient/HomePageSectionContainer';
import ContactTracingCard from './HouseholdTestingCard';
import WarningIcon from '@material-ui/icons/Warning';
import MissedReports from './MissedReports';
import MissedPhoto from './MissedPhoto';

const RequiresAction = observer(() => {
    const { patientStore, uiStore } = useStores();
    const { t } = useTranslation('translation');
    
    const shouldShowMissedPhoto = patientStore.eligibleForBackPhoto;
    const shouldShowMissedReports = !uiStore.offline && patientStore.missingReports.length > 0;
    const shouldShowContactTracing = patientStore.contactTracingNeeded;
    const shouldRender = shouldShowMissedReports || shouldShowContactTracing || shouldShowMissedPhoto;

    return (
        <>
            {shouldRender && <HomePageSectionContainer upperText={<><WarningIcon />{t('patient.home.cardTitles.actionNeeded')}</>}>
                {shouldShowMissedPhoto && <MissedPhoto />}
                {shouldShowMissedReports && <MissedReports />}
                {shouldShowContactTracing && <ContactTracingCard />}
            </HomePageSectionContainer>}
        </>
    )
});

export default RequiresAction;