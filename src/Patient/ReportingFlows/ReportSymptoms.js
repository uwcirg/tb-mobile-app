import React from 'react';
import { observer } from 'mobx-react';
import SymptomsList from './SymptomsList.js'
import SimpleButton from '../../Basics/SimpleButton'
import useStores from '../../Basics/UseStores.js';
import { Box, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SymptomWarning from './SymptomWarning.js';
import NauseaPopUp from './NauseaPopUp';

const ReportSymptoms = observer((props) => {

    const classes = useStyles();
    const { patientStore } = useStores();
    const { t } = useTranslation('translation');

    patientStore.report.headerText = t("patient.report.symptomsTitle")

    const handleNext = () => {
        patientStore.reportStore.submitSymptoms();
        props.advance()
        if (!patientStore.report.isHistoricalReport) {
            patientStore.report.hasSubmitted = true;
        }
    }

    const symptoms = t("commonWords.symptoms");

    return (
        <>
            <Box padding="8px 16px">
                <SymptomsList />
            </Box>
            <SimpleButton alignRight className={classes.button} onClick={handleNext}>
                {t("commonWords.report")} {patientStore.report.selectedSymptoms.length === 0 ? t("commonWords.no") : patientStore.report.selectedSymptoms.length} {patientStore.report.selectedSymptoms.length === 1 ? symptoms.substring(0, symptoms.length - 1) : symptoms}
            </SimpleButton>
            {patientStore.uiState.symptomWarningVisible && <SymptomWarning />}
            {patientStore.nasueaSelected && <NauseaPopUp />}
        </>)
});

const useStyles = makeStyles({
    button: {
        marginRight: "2em"
    }
})

export default ReportSymptoms;
