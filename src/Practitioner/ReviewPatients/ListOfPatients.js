import React, { useContext } from "react";
import { DateTime } from "luxon";
import PractitionerContext from "../PractitionerContext";
import addIssuesToPatients from "../../Utility/FindIssues";
import { Box } from "@material-ui/core";
import PatientCard from "./PatientCard";
import PatientListMessage from "./PatientListMessage";
import { checkWasToday } from "../../Utility/TimeUtils";
import IssueSectionLabel from "./IssueSectionLabel";
import Grid from "../../Layouts/Grid";
import Stack from "../../Layouts/Stack";

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

  const processedPatients = addIssuesToPatients(patientsToDisplay || []).sort(
    (a, b) => {
      return b.issues.total - a.issues.total;
    }
  );

  // filter patients with issues
  const patientsWithIssues = processedPatients.filter((patient) => {
    return patient.issues.total > 0;
  });
  // filter patients with no issues
  const patientsWithoutIssues = processedPatients.filter((patient) => {
    return patient.issues.total === 0;
  });

  if (status === "pending") return <PatientListMessage isLoading={true} />;

  if (!patients) return "";

  return (
    <Stack>
      {patientsWithIssues.length > 0 && (
        <>
          <IssueSectionLabel isIssues={true} />
          <Grid>
            {patientsWithIssues.map((patient) => {
              return (
                <PatientCard
                  isReviewed={tabValue === 1}
                  markPatientAsReviewed={markPatientAsReviewed}
                  patient={patient}
                  key={patient.id}
                />
              );
            })}
          </Grid>
        </>
      )}
      {patientsWithoutIssues.length > 0 && (
        <>
          <IssueSectionLabel isIssues={false} />
          <Grid>
            {patientsWithoutIssues.map((patient) => {
              return (
                <PatientCard
                  isReviewed={tabValue === 1}
                  markPatientAsReviewed={markPatientAsReviewed}
                  patient={patient}
                  key={patient.id}
                />
              );
            })}
          </Grid>
        </>
      )}
      <Box height="60px" aria-hidden />
    </Stack>
  );
};

export default ListOfPatients;
