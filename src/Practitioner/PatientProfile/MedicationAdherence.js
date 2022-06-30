import React from 'react';
import useStores from '../../Basics/UseStores';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import AdherenceValue from '../../Components/AdherenceValue';
import StackedLinearProgress from '../../Components/StackedLinearProgress';

const Adherence = observer(() => {
  const { details: patient } = useStores().patientProfileStore.selectedPatient;

  const { t } = useTranslation('translation');

  const part = Math.floor(
    (patient.medicationSummary.adherentDays /
      patient.medicationSummary.daysSinceAppStart) *
      100
  );
  const total = Math.floor(
    ((patient.medicationSummary.adherentDays +
      patient.medicationSummary.reportedMissedDays) /
      patient.medicationSummary.daysSinceAppStart) *
      100
  );
  const diff =
    patient.medicationSummary.daysSinceAppStart -
    patient.medicationSummary.reportedMissedDays -
    patient.medicationSummary.adherentDays;

  return (
    <div>
      <AdherenceValue title="Meds" adherence={patient.adherence} icon="null">
        <StackedLinearProgress
          partValue={part}
          totalValue={total}
          detailContent={{
            green: {
              label: t(
                'coordinator.patientProfile.adherenceSection.reportedTaking'
              ),
              data: patient.medicationSummary.adherentDays,
            },
            yellow: {
              label: t('coordinator.patientProfile.adherenceSection.didntTake'),
              data: patient.medicationSummary.reportedMissedDays,
            },
            red: {
              label: t(
                'coordinator.patientProfile.adherenceSection.didntReport'
              ),
              data: diff,
            },
          }}
        />
      </AdherenceValue>
    </div>
  );
});

export default Adherence;
