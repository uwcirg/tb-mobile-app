import React, { useContext } from 'react';
import PatientCard from './PatientCard';
import { Box, Typography } from '@material-ui/core';
import PractitionerContext from '../PractitionerContext';
import PatientListMessage from './PatientListMessage';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import ChunkLabel from './ListSectionLabel';
import ListSectionLabel from './ListSectionLabel';

const AllPatientsList = ({ searchName = '' }) => {
  const { t } = useTranslation();

  const { value: unsortedPatients, status } =
    useContext(PractitionerContext).patients;
  const patients = unsortedPatients?.sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  if (status === 'pending') return <PatientListMessage isLoading={true} />;

  let currentPatientStatus;

  let searchResults =
    patients &&
    patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(searchName)
    );

  return (
    <div>
      {patients?.length < 1 && <PatientListMessage tab={2} />}
      {patients &&
        searchResults.map((patient) => {
          let showSection = false;
          if (patient.status !== currentPatientStatus) {
            showSection = true;
            currentPatientStatus = patient.status;
          }
          return (
            <div key={`review-patient-${patient.id}`}>
              {showSection && (
                <Box padding="1em 0 0 .5em">
                  <ListSectionLabel>
                    {t(
                      `coordinator.cohortOverview.${patient.status.toLowerCase()}`
                    )}
                  </ListSectionLabel>
                </Box>
              )}
              <Box padding="8px 8px 0 8px">
                <PatientCard isSimpleView patient={patient} />
              </Box>
            </div>
          );
        })}
      <Box height="68px" />
    </div>
  );
};

export default AllPatientsList;
