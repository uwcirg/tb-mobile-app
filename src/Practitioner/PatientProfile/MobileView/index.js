import React from "react";
import useStores from "../../../Basics/UseStores";
import { observer } from "mobx-react";
import StickyTopBar from "../../../Components/Shared/StickyTopBar";
import { Box, Typography } from "@material-ui/core";
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
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import SymptomSummary from "../SymptomSummary";
import PatientProgress from "../Details/PatientInfo";

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
        <PageLabel
          title={<NameAndNumber patient={patient} />}
          to={"/home/needs-review"}
        />
      </StickyTopBar>
      <Box minHeight="90vh" bgcolor={Colors.lightgray} padding="8px">
        <PatientDetailsCard patient={patient} />
        <Card>
          <ButtonList />
        </Card>
        <AppointmentCard
          patient={patientProfileStore.selectedPatient.details}
        />
        <Card title={t("coordinator.patientProfile.symptomSummary.title")}>
          <SymptomSummary patient={patient} />
        </Card>
        <Card title={t("coordinator.cardTitles.overviewOfProgress")}>
          <PatientProgress />
        </Card>
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

const NameAndNumber = ({ patient }) => {
  return (
    <Box
      padding=".5em 1em"
      display="flex"
      justifyContent="flex-end"
      flexDirection="column"
      width="100%"
      textAlign="right"
    >
      <Typography variant="h1">{patient.fullName}</Typography>
      <Box
        display="flex"
        flexGrow={1}
        alignItems="center"
        justifyContent="flex-end"
        style={{ color: Colors.blue }}
        paddingLeft
      >
        <WhatsAppIcon style={{ height: ".75em", color: Colors.blue }} />
        <Typography variant="body1" color="initial">
          {patient.phoneNumber}
        </Typography>
      </Box>
    </Box>
  );
};

export default MobilePatientProfile;
