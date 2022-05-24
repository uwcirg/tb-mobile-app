import React from 'react';
import Typography from '@material-ui/core/Typography'
import useStyles from './styles';
import useStores from '../../../Basics/UseStores';
import Box from '@material-ui/core/Box';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { useTranslation } from 'react-i18next';
import { ButtonBase, Grid, Paper } from '@material-ui/core';
import capitalizeFirstLetter from '../../../Utility/StringUtils';
import ButtonText from './ButtonText';

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
        <Paper elevation={1}>
            <ButtonBase style={{ width: "100%", backgroundColor: "#E3F2FD", padding: "16px" }} onClick={handlePhotoClick} >
                <Grid alignItems='center' wrap="nowrap" container>
                    <CameraAlt style={{ color: "#1976D2", fontSize: "2em" }} />
                    <Box flexGrow={1}>
                        <ButtonText>{t('patient.oneStepReporting.photoRequestButton')}</ButtonText>
                    </Box>
                </Grid>
            </ButtonBase>
        </Paper>
    </Box>)

}

export default PhotoRequestArea;