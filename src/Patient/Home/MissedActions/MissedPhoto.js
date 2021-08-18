import React from 'react';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import useStores from '../../../Basics/UseStores';
import MissedActionCard from './MissedActionCard';
import { useTranslation } from 'react-i18next';
import Colors from '../../../Basics/Colors';
import Buttonlayout from './ButtonLayout';

const MissedPhoto = () => {
    
    const { t } = useTranslation('translation');
    const {uiStore} = useStores();
    const openMissedPhoto = () => { uiStore.push('/missed-photo') }

    return (
        <MissedActionCard on>
            <Buttonlayout
                text={t('patient.home.missedDays.missedPhoto')}
                icon={<PhotoIcon />}
                color={Colors.warningRed} 
                onClick={openMissedPhoto}
                />
        </MissedActionCard>)
}

export default MissedPhoto;