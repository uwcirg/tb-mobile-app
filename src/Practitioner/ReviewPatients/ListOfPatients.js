import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import PractitionerContext from '../PractitionerContext';
import addIssuesToPatients from '../../Utility/FindIssues';
import { Box, Grid } from '@material-ui/core';
import PatientCard from './PatientCard';
import PatientListMessage from './PatientListMessage';
import checkWasToday from './checkWasToday';
import IssueSectionLabel from './IssueSectionLabel';

// When patient's photo is reviewed, unreviewedPhotos is turned into [];
// When patient with outstanding unresolved reports is reviewed, unresolvedReports is turned into [] in patientsToDisplay;
// It is necessary to check whether the report was created after the lastGeneralResolution
// I am trying to check that the patient meets all requirements to be marked as reviewed
// These requirements are, date checked, and no unresolved reports / photos

const ListOfPatients = ({ tabValue }) => {
  const {
    value: patients,
    setValue: setPatients,
    status,
  } = useContext(PractitionerContext).patientIssues;

  const markPatientAsReviewed = (patientId) => {
    let tempValue = [...patients];
    const indexOfPatient = tempValue.findIndex((each) => {
      return each.id === patientId;
    });
    tempValue[indexOfPatient].lastGeneralResolution = DateTime.local().toISO();
    tempValue[indexOfPatient].unresolvedReports = [];
    setPatients(tempValue);
  };

  const patientsToDisplay = (patients || []).filter((patient) => {
    if (tabValue === 2) return true;

    const hasUnresolvedReports =
      patient.unresolvedReports?.length > 0 ||
      patient.unreviewedPhotos?.length > 0;

    const updatedAfterResolution =
      patient.unresolvedReports?.filter((unresolved) => {
        return unresolved.date >= DateTime.local().toISODate();
      })[0]?.updatedAt > patient.lastGeneralResolution;

    const isUnresolved = hasUnresolvedReports && updatedAfterResolution;
    const resolvedToday = checkWasToday(patient.lastGeneralResolution);

    const reviewed = resolvedToday && !isUnresolved;
    return tabValue === 0 ? !reviewed : reviewed;
  });

  //@Todo - wrap this in a callback since the calculations are complex
  // - Create clearer and better algorithim for sorting the patients so issues float to top
  // addIssuesToPatients()
  const processedPatients = addIssuesToPatients(patientsToDisplay || []).sort(
    (a, b) => {
      return b.issues.total - a.issues.total;
    }
  );

  if (status === 'pending') return <PatientListMessage isLoading={true} />;

  if (!patients) return '';

  let currentSection;

  return (
    <Grid container direction="column">
      <Box height={'.5em'} aria-hidden />
      {processedPatients.length === 0 && <PatientListMessage tab={tabValue} />}
      {processedPatients.map((patient) => {
        let isIssues = patient.issues.total > 0;
        let showSection = currentSection !== isIssues;
        if (showSection) {
          currentSection = isIssues;
        }
        return (
          <Box key={`review-patient-${patient.id}`} padding="0 .5em .5em .5em">
            {showSection && tabValue !== 1 && (
              <IssueSectionLabel isIssues={isIssues} />
            )}
            <PatientCard
              isReviewed={tabValue === 1}
              markPatientAsReviewed={markPatientAsReviewed}
              patient={patient}
            />
          </Box>
        );
      })}
      <Box height="60px" aria-hidden />
    </Grid>
  );
};

export default ListOfPatients;
