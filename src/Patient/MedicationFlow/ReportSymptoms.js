import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { DateTime } from 'luxon'
import SymptomsList from './SymptomsList.js'
import SimpleButton from '../../Basics/SimpleButton'
import styled from 'styled-components';
import InteractionCard from '../../Basics/InteractionCard';
import useStores from '../../Basics/UseStores.js';
import PopUp from '../Navigation/PopUp.js';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import NewButton from '../../Basics/NewButton'
import ReportPopUp from './ReportPopUp.js';
import SymptomWarning from './SymptomWarning.js';

const ReportSymptoms = observer((props) => {

    const classes = useStyles();
    const {patientStore} = useStores();
    const {t, i18n} = useTranslation('translation');

    patientStore.report.headerText = t("patient.report.symptomsTitle")

    const handleNext = () => {
        props.advance()
        if(!patientStore.report.isHistoricalReport){
            patientStore.report.hasSubmitted = true;
        }
        
    }

    return (
        <div>
            <InteractionCard id="intro-symptoms" upperText={t("commonWords.symptoms")}>
                <SymptomsList />
            </InteractionCard>
            <SimpleButton alignRight className={classes.button} onClick={handleNext}>
                {t("commonWords.report")} {patientStore.report.selectedSymptoms.length === 0 ? t("commonWords.no") : patientStore.report.selectedSymptoms.length} {t("commonWords.symptoms")}
            </SimpleButton>
            {patientStore.uiState.symptomWarningVisible && <SymptomWarning />}
        </div>)
});

const useStyles = makeStyles({
    button:{
        marginRight: "2em"
    }
})

export default ReportSymptoms;
