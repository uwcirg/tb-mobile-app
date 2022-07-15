import React from "react";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import StickyTopBar from "../../../Components/Shared/StickyTopBar";
import { Box } from "@material-ui/core";
import Colors from "../../../Basics/Colors";
import ButtonList from "../Buttons";
import { PageLabel } from "../../../Components/Shared/PageLabel";
import { Switch, Route } from "react-router-dom";
import ReportingPopOver from "../../Shared/ReportingPopOver";
import { useHistory } from "react-router-dom";
import PhotoAdherence from "../Adherence/Photo";
import MedicationAdherence from "../Adherence/Medication";
import { useTranslation } from "react-i18next";
import AppointmentCard from "./AppointmentCard";
import Card from "./Card";
import PatientDetailsCard from "./PatientDetailsCard";

const MobilePatientProfile = observer(() => {
  const { patientProfileStore } = useStores();
  const history = useHistory();

  return (
    <Switch>
      <Route path="*/reports">
        <ReportingPopOver
          handleExit={() => {
            history.push(
              `/patients/${patientProfileStore.selectedPatient.details.id}`
            );
          }}
          patient={patientProfileStore.selectedPatient.details}
        />
      </Route>
      <Route>
        <MobileView />
      </Route>
    </Switch>
  );
});

const MobileView = observer(() => {
  const { t } = useTranslation("translation");
  const { patientProfileStore } = useStores();
  const patient = patientProfileStore.selectedPatient.details;

  return (
    <>
      <StickyTopBar>
        <PageLabel title={patient.fullName} to={"/home/needs-review"} />
      </StickyTopBar>
      <Box minHeight="90vh" bgcolor={Colors.lightgray} padding="8px">
        <PatientDetailsCard patient={patient} />
        <Card>
          <ButtonList />
        </Card>
        <AppointmentCard
          patient={patientProfileStore.selectedPatient.details}
        />
        <Card title={t("coordinator.cohortOverview.adherenceGraph")}>
          <Box height="8px" />
          <MedicationAdherence />
          <PhotoAdherence />
        </Card>
        <Box height="60px" aria-hidden />
      </Box>
    </>
  );
});


export default MobilePatientProfile;
