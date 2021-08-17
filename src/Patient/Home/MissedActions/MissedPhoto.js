import React from 'react';
import PhotoIcon from '@material-ui/icons/CameraAlt';
import Colors from '../../../Basics/Colors';
import MissedActionCard from './MissedActionCard';
import Buttonlayout from './ButtonLayout';
import { useTranslation } from 'react-i18next';

const MissedPhoto = () => {
    
    const { t } = useTranslation('translation');

    return (
        <MissedActionCard>
            <Buttonlayout
                text={t('patient.home.missedDays.missedPhoto')}
                icon={<PhotoIcon />}
                color={Colors.warningRed} />
        </MissedActionCard>)
}

export default MissedPhoto;