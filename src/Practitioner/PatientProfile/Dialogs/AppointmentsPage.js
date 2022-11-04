import React from "react";
import PopOverV2 from "../../../Components/Shared/PopOverV2";
import AppointmentList from "../../../Components/Shared/Appointments/List";
import { Box, Grid } from "@material-ui/core";
import FlatButton from "../../../Components/FlatButton";
import { Add } from "@material-ui/icons";
import { useTranslation } from "react-i18next";
import OverTopBar from "../../../Patient/Navigation/OverTopBar";
import TopPageLabel from "../../../Components/Shared/TopPageLabel";

export default function AppointmentsPage({ patientId }) {
  const { t } = useTranslation("translation");

  return (
    <>
      <TopPageLabel title={t("patient.reminders.appointments")} sticky />
      <Box padding="1rem .5rem">
        <Grid justify="flex-end" container>
          <FlatButton to={`/patients/${patientId}/add-appointment`}>
            <Add />
            {t("appointments.addAppointment")}
          </FlatButton>
        </Grid>
      </Box>
      <Box padding="1rem">
        <AppointmentList patientId={patientId} />
      </Box>
    </>
  );
}
