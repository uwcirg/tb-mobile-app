import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useStores from '../../../Basics/UseStores';
import HomePageSectionContainer from '../../../Components/Patient/HomePageSectionContainer';
import ContactTracingCard from './ContactTracingCard';
import WarningIcon from '@material-ui/icons/Warning';
import MissedReports from './MissedReports';
import MissedPhoto from './MissedPhoto';

const RequiresAction = observer(() => {
    const { patientStore, uiStore } = useStores();
    const { t } = useTranslation('translation');
    const shouldShowMissedReports = !uiStore.offline && patientStore.missingReports.length > 0;
    
    //@TODO - implement logic for the conditional rendering of these fields
    const shouldShowContactTracing = patientStore.patientInformation.daysInTreatment > 30; 
    const shouldShowMissedPhoto = patientStore.lastPhotoRequestStatus.daysSinceLastRequest <=3 &&  !patientStore.lastPhotoRequestStatus.photoWasSubmitted;

    return (
        <HomePageSectionContainer upperText={<><WarningIcon />{t('patient.home.cardTitles.actionNeeded')}</>}>
            {shouldShowMissedPhoto && <MissedPhoto />}
            {shouldShowMissedReports && <MissedReports />}
            {shouldShowContactTracing && <ContactTracingCard />}
        </HomePageSectionContainer>)
});

export default RequiresAction;