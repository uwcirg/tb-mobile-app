import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import useStores from '../../../Basics/UseStores';
import HomePageSectionContainer from '../../../Components/Patient/HomePageSectionContainer';
import ContactTracingCard from './ContactTracingCard';
import MissedReports from './MissedReports';
import WarningIcon from '@material-ui/icons/Warning';

const RequiresAction = observer(() => {
    const { patientStore, patientUIStore, uiStore } = useStores();
    const { t } = useTranslation('translation');

    const handleReportClick = (date) => {
        patientStore.uiState.selectedCalendarDate = date;
        patientUIStore.startHistoricalReport();
    }

    const shouldShowMissedReports = !uiStore.offline && patientStore.missingReports.length > 0;
    const shouldShowContactTracing = true;

    return (
        <HomePageSectionContainer upperText={<><WarningIcon />{t('patient.home.cardTitles.actionNeeded')}</>}>
            {shouldShowMissedReports && <MissedReports />}
            {shouldShowContactTracing && <ContactTracingCard /> }
        </HomePageSectionContainer>)
});

export default RequiresAction;