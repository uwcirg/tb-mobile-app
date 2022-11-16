import { Box, Grid, Typography } from "@material-ui/core";
import { DateTime } from "luxon";
import React from "react";
import { useTranslation } from "react-i18next";
import Colors from "../../../Basics/Colors";
import ReportingHistoryLinks from "../../../Components/Shared/ReportingHistoryLinks";
import Priority from "../../Shared/Priority";
import Card from "./Card";
import Label from "../../../Components/Label";

export default function PatientDetailsCard({ patient }) {
  const { t } = useTranslation("translation");

  const { lastReport, weeksInTreatment, priority } = patient;

  const daysAgo = !!lastReport
    ? Math.round(DateTime.fromISO(lastReport.createdAt).diffNow("days").days) *
      -1
    : t("coordinator.tasksSidebar.noneYet");

  return (
    <Card title={t("coordinator.patientTableLabels.details")}>
      <ReportingHistoryLinks patient={patient} />
      <Box height="1em" />
    </Card>
  );
}
