import React from "react";
import Card from "./Card";
import { useTranslation } from "react-i18next";
import LineItem from "../../../Components/Shared/Appointments/LineItem";
import ClickableText from "../../../Basics/ClickableText";
import { Box } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";

export default function AppointmentCard({ patient }) {
  const { t } = useTranslation("translation");
  return (
    <Card title={t("appointments.nextAppointment")}>
      {patient.nextReminder ? (
        <LineItem isNextAppointment reminder={patient.nextReminder} />
      ) : (
        <p>{t("appointments.noUpcoming")}</p>
      )}
      <Box height=".5rem" />
      <ClickableText
        to={`/patients/${patient.id}/appointments`}
        hideIcon
        text={
          <>
            {t("appointments.manage")}
            <KeyboardArrowRight />
          </>
        }
      />
    </Card>
  );
}
