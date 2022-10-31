import React, { useContext } from "react";
import PractitionerContext from "../PractitionerContext";
import PatientListMessage from "./PatientListMessage";
import { useTranslation } from "react-i18next";
import ListSectionLabel from "./ListSectionLabel";
import FilteredPatientList from "./FilteredPatientList";
import Stack from "../../Layouts/Stack";

const AllPatientsList = ({ searchName = "" }) => {
  const { t } = useTranslation();

  const { value: unsortedPatients, status } =
    useContext(PractitionerContext).patients;
  const patients = unsortedPatients?.sort((a, b) => {
    return a.status.localeCompare(b.status);
  });

  if (status === "pending") return <PatientListMessage isLoading={true} />;

  let searchResults =
    patients &&
    patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(searchName)
    );

  return (
    <Stack>
      <ListSectionLabel>
        {t(`coordinator.cohortOverview.active`)}
      </ListSectionLabel>
      <FilteredPatientList
        patients={searchResults?.filter(
          (patient) => patient.status === "Active"
        )}
        isSimpleView={true}
      />
      <ListSectionLabel>
        {t(`coordinator.cohortOverview.pending`)}
      </ListSectionLabel>
      <FilteredPatientList
        patients={searchResults?.filter(
          (patient) => patient.status === "Pending"
        )}
        isSimpleView={true}
      />
    </Stack>
  );
};

export default AllPatientsList;
