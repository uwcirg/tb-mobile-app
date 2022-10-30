import React, { useContext } from "react";
import PatientCard from "./PatientCard";
import { Box, Typography } from "@material-ui/core";
import PractitionerContext from "../PractitionerContext";
import PatientListMessage from "./PatientListMessage";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import ChunkLabel from "./ListSectionLabel";
import ListSectionLabel from "./ListSectionLabel";
import "./every-layout.css";
import FilteredPatientList from "./FilteredPatientList";

const AllPatientsList = ({ searchName = "" }) => {
  const { t } = useTranslation();

  const { value: unsortedPatients, status } =
    useContext(PractitionerContext).patients;
  const patients = unsortedPatients?.sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  if (status === "pending") return <PatientListMessage isLoading={true} />;

  let currentPatientStatus;

  let searchResults =
    patients &&
    patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(searchName)
    );

  patients && console.log(patients[0].status);

  return (
    <>
      <Box padding="1em 0 0 .5em" flexGrow="100">
        <ListSectionLabel>
          {t(`coordinator.cohortOverview.active`)}
        </ListSectionLabel>
      </Box>
      <FilteredPatientList
        patients={patients?.filter((patient) => patient.status === "Active")}
      />
      <Box padding="1em 0 0 .5em" flexGrow="100">
        <ListSectionLabel>
          {t(`coordinator.cohortOverview.pending`)}
        </ListSectionLabel>
      </Box>
      <FilteredPatientList
        patients={patients?.filter((patient) => patient.status === "Pending")}
      />
    </>
  );
};

export default AllPatientsList;

//   {patients &&
//     searchResults.map((patient) => {
//       let showSection = false;
//       if (patient.status !== currentPatientStatus) {
//         showSection = true;
//         currentPatientStatus = patient.status;
//       }
//       return (
//         <div key={patient.id}>
//           {showSection && (

//           )}

//       );
//     })}
//   <Box height="68px" />
// </div>
