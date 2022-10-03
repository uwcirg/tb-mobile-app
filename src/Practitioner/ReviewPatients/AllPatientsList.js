import React, { useContext } from 'react';
import PatientCard from './PatientCard';
import { Box, Typography } from '@material-ui/core';
import PractitionerContext from '../PractitionerContext';
import PatientListMessage from './PatientListMessage';
import { useTranslation } from 'react-i18next';
import ListSectionLabel from './ListSectionLabel';

const AllPatientsList = () => {
  const { t } = useTranslation();

  const { value: unsortedPatients, status } =
    useContext(PractitionerContext).patients;
  const patients = unsortedPatients?.sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  if (status === 'pending') return <PatientListMessage isLoading={true} />;

  let currentPatientStatus;

  return (
    <div>
      {/* default placeholder if no patients are found */}
      {patients?.length < 1 && <PatientListMessage tab={2} />}

      {patients &&
        patients.map((each) => {
          let showSection = false;
          if (each.status !== currentPatientStatus) {
            showSection = true;
            currentPatientStatus = each.status;
          }
          return (
            <div key={`review-patient-${each.id}`}>
              {showSection && (
                <Box padding="1em 0 0 .5em">
                  <ListSectionLabel>
                    {t(
                      `coordinator.cohortOverview.${each.status.toLowerCase()}`
                    )}
                  </ListSectionLabel>
                </Box>
              )}
              <Box padding="8px 8px 0 8px">
                <PatientCard isSimpleView patient={each} />
              </Box>
            </div>
          );
        })}
      <Box height="68px" />
    </div>
  );
};

export default AllPatientsList;
