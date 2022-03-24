import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useStores from '../../../Basics/UseStores';
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next';
import BottomButton from './BottomButton';
import ContentContainer from './ContentContainer';

const useStyles = makeStyles({
    fullWidth: {
        padding: "0 1em",
        boxSizing: "border-box"
    },
})

const NotEligible = () => {
    const { t } = useTranslation('translation');
    const classes = useStyles();
    const { patientUIStore } = useStores();

    return (
        <>
            <ContentContainer>
                <Typography variant="body1" className={classes.fullWidth}>
                    {t('missedPhotoDetails.notRequired')}
                </Typography>
            </ContentContainer>
            <BottomButton onClick={patientUIStore.goToHome}>{t('patient.report.symptoms.warning.button')}</BottomButton>
        </>
    )
}

export default NotEligible;