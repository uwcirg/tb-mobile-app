import React from 'react';
import useStores from '../../../Basics/UseStores';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import ConfirmationLayout from '../../../Components/Patient/ConfirmationLayout';
import BottomButton from './BottomButton';
import ContentContainer from './ContentContainer';

const Confirmation = () => {

    const { t } = useTranslation('translation');
    const { patientUIStore, patientStore } = useStores();

    const handleConfirmation = () => {
        patientUIStore.goToHome();
        patientStore.initalize();
    }

    return (
        <>
            <ContentContainer>
                <ConfirmationLayout title={t('commonWords.successMessage')} />
                <Typography align="center" variant="body1" color="initial">{t('missedPhotoDetails.confirmation')}</Typography>
            </ContentContainer>
            <BottomButton onClick={handleConfirmation}>{t('patient.home.completed.title')}</BottomButton>
        </>
    )
}

export default Confirmation;