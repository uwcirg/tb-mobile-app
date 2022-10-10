import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { CameraAltRounded } from "@material-ui/icons";
import Pill from "../../../Basics/Icons/Pill";
import { useTranslation } from "react-i18next";
import percentFormatter from "../../CohortView/TableViews/Percent";

export default function LabeledBar({ type, bar, adherenceValue }) {
  const { t } = useTranslation("translation");
  return (
    <Box paddingTop="8px">
      <Grid container wrap="nowrap" alignItems="center">
        {type === "photo" ? (
          <CameraAltRounded titleAccess={t("dashboard.photoReports")} />
        ) : (
          <Pill titleAccess={t("coordinator.patientTableLabels.adherence")} />
        )}
        <Box margin="0 8px" flexGrow="1">
          {bar}
        </Box>
        <Typography>
          <strong>{percentFormatter(adherenceValue)}</strong>
        </Typography>
      </Grid>
    </Box>
  );
}
