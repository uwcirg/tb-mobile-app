
import React from 'react';
import { Grid } from '@material-ui/core';
import { Assignment as Clipboard } from '@material-ui/icons';
import Symptom from '../../Shared/Symptom';
import { useTranslation } from 'react-i18next';
import IssueCard from './IssueCard';
import Colors from '../../../Basics/Colors';

const SymptomSummary = ({ patient }) => {
  const { t } = useTranslation('translation');

  return (
    <IssueCard
      colors={Colors.warningRed}
      title={t('commonWords.symptoms')}
      icon={<Clipboard style={{ color: Colors.warningRed }} />}
      issueCount={Object.keys(patient.issues.symptomCounts).length}
      childrenStyles={{ color: Colors.warningRed }}

    >
      {Object.keys(patient.issues.symptomCounts).map((string, index) => {
        const count = patient.issues.symptomCounts[string];
        return (
          <Grid key={`${patient.id}-symptom-${index}`} container>
            <Symptom string={string} />
            {count > 1 && <>: {count}</>}
          </Grid>
        );
      })}
    </IssueCard>
  );
};

export default SymptomSummary;
