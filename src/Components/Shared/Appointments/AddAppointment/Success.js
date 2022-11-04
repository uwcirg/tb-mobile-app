import { Box, Grid, Typography } from "@material-ui/core";
import { CheckCircle, AddCircle, ExitToApp } from "@material-ui/icons";
import React from "react";
import Colors from "../../../../Basics/Colors";
import NewButton from "../../../../Basics/NewButton";
import { useTranslation } from "react-i18next";

export default function Success({ handleReset, handleExit }) {
  const { t } = useTranslation("translation");

  return (
    <Box>
      <Box padding="32px 16px">
        <Grid alignItems="center" container wrap="nowrap">
          <CheckCircle style={{ color: Colors.green, fontSize: "5rem" }} />
          <Box padding="0 1rem">
            <Typography style={{ fontSize: "1.5rem", lineHeight: "1.75rem" }}>
              {t("patient.reminders.successMessage")}
            </Typography>
          </Box>
        </Grid>
      </Box>
      <Box padding="0 1em">
        <NewButton
          onClick={handleReset}
          text={t("appointments.addAnother")}
          icon={<AddCircle />}
        />
        <NewButton
          onClick={handleExit}
          text={t("archive.complete")}
          icon={<ExitToApp />}
        />
      </Box>
    </Box>
  );
}
