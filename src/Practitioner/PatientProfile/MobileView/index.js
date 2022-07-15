import React from "react";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import StickyTopBar from "../../../Components/Shared/StickyTopBar";
import { Box, Grid, Typography } from "@material-ui/core";
import Colors from "../../../Basics/Colors";
import Priority from "../../Shared/Priority";
import ButtonList from "../Buttons";
import Label from "../../../Components/Label";
import { PageLabel } from "../../../Components/Shared/PageLabel";
import { DateTime } from "luxon";
import { Switch, Route, Link } from "react-router-dom";
import ReportingPopOver from "../../Shared/ReportingPopOver";
import { useHistory } from "react-router-dom";
import ReportingHistoryLinks from "../../../Components/Shared/ReportingHistoryLinks";
import SectionTitle from "./SectionTitle";
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

/*
adherence: (...)
age: (...)
appStartTime: (...)
channelId: (...)
contactTracingSurvey: (...)
daysInTreatment: (...)
familyName: (...)
fullName: (...)
gender: (...)
givenName: (...)
id: (...)
lastContacted: (...)
lastMissedDay: (...)
lastReport: (...)
lastSymptoms: (...)
medicationSummary: (...)
organizationId: (...)
percentageComplete: (...)
phoneNumber: (...)
photoAdherence: (...)
photoSummary: (...)
priority: (...)
reportingStatus: (...)
status: (...)
supportRequests: (...)
treatmentEndDate: (...)
treatmentStart: (...)
weeksInTreatment: (...)
*/

export default MobilePatientProfile;
