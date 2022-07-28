import React, { useContext } from 'react';
import { DateTime } from 'luxon';
import PractitionerContext from '../PractitionerContext';
import addIssuesToPatients from '../../Utility/FindIssues';
import { Box, Grid } from '@material-ui/core';
import PatientCard from './PatientCard';
import PatientListMessage from './PatientListMessage';
import ListSectionLabel from './ListSectionLabel';
import { useTranslation } from 'react-i18next';
import { Announcement, ThumbUp } from '@material-ui/icons';

const wasToday = (isoTime) => {
  return DateTime.fromISO(isoTime).toISODate() === DateTime.local().toISODate();
};

const IssueSectionLabel = ({ isIssues }) => {
  const { t } = useTranslation('translation');
  return (
    <Grid container alignItems="center">
      {/* {isIssues ? <Announcement style={{ color: Colors.yellow }} /> : <ThumbUp style={{ color: Colors.green }} />} */}
      {/* <Box width="8px" /> */}
      <ListSectionLabel>
        {isIssues ? t('reviewIssues.hasIssues') : t('reviewIssues.onTrack')}
      </ListSectionLabel>
    </Grid>
  );
};

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
    setPatients(tempValue);
  };

  const patientsToDisplay = (patients || []).filter((_patient) => {
    if (tabValue === 2) return true;
    const alreadyReviewed = wasToday(_patient.lastGeneralResolution);
    return tabValue === 0 ? !alreadyReviewed : alreadyReviewed;
  });

  //@Todo - wrap this in a callback since the calculations are complex
  // - Create clearer and better algorithim for sorting the patients so issues float to top
  const patientsWithIssues = addIssuesToPatients(patientsToDisplay || []).sort(
    (a, b) => {
      return b.issues.total - a.issues.total;
    }
  );

  if (status === 'pending') return <PatientListMessage isLoading={true} />;

  if (!patients) return '';

  let currentSection;

  const reviewedPatients = [...patients]?.filter(
    (patient) => patient.lastGeneralResolution
  );

  return (
    <Grid container direction="column">
      <Box height={'.5em'} aria-hidden />

      {/* If there are no reviewed patients, render default */}
      {reviewedPatients.length < 1 && tabValue === 1 && (
        <PatientListMessage tab={tabValue} />
      )}

      {/* If there are no patients with issues, render default */}
      {patientsWithIssues.length < 1 && tabValue === 0 && (
        <PatientListMessage tab={tabValue} />
      )}

      {/* all patients tab is rendered in AllPatientsList.js, where default is rendered too when < 1 */}

      {patientsWithIssues.map((patient) => {
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
