import React from 'react';
import { Grid } from '@material-ui/core';
import { Assignment as Clipboard } from '@material-ui/icons'
import Symptom from '../../Shared/Symptom';
import { useTranslation } from 'react-i18next';
import ExpandableCard from '../../../Components/ExpandableCard';

const SymptomSummary = ({ patient }) => {

    const { t } = useTranslation('translation');

    return (
        <ExpandableCard title={t('commonWords.symptoms')} icon={Clipboard} number={Object.keys(patient.issues.symptomCounts).length}>
            {Object.keys(patient.issues.symptomCounts).map((string, index) => {
                const count = patient.issues.symptomCounts[string];
                return (<Grid key={`${patient.id}-symptom-${index}`} container>
                    <Symptom string={string} />
                    {count > 1 && <>: {count}</>}
                </Grid>)
            })}
        </ExpandableCard>
    )

}

export default SymptomSummary;