import React from 'react';
import Typography from '@material-ui/core/Typography'
import useStyles from './styles';
import useStores from '../../../Basics/UseStores';
import Box from '@material-ui/core/Box';
import ActionButton from './ActionButton';
import CameraAlt from '@material-ui/icons/CameraAlt';
import Colors from '../../../Basics/Colors';
import { useTranslation } from 'react-i18next';

const PhotoRequestArea = () => {

    const classes = useStyles();
    const { patientStore, patientUIStore } = useStores();
    const { t } = useTranslation('translation');

    const handlePhotoClick = () => {
        if (patientStore.isPhotoDay) {
            patientUIStore.setSkippedToPhoto(true);
            patientUIStore.openPhotoReport();
        }
    }

    return (<Box paddingBottom="1em">
        <Typography className={classes.sectionHeader} variant="body1" color="initial">{t('patient.oneStepReporting.photoRequestTitle')}</Typography>
        <Box height="1em" />
        <ActionButton onClick={handlePhotoClick} text={t('patient.oneStepReporting.photoRequestButton')} icon={<CameraAlt />} backgroundColor={Colors.actionBlue} />
    </Box>)

}

export default PhotoRequestArea;