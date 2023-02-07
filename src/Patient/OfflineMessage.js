import React from "react";
import Colors from "../Basics/Colors";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@material-ui/core";
import { WarningRounded } from "@material-ui/icons";

export default function OfflineMessage() {
  const { t } = useTranslation("translation");

  return (
    <div
      style={{
        backgroundColor: Colors.highlightYellow,
        padding: ".5em 1em",
      }}
    >
      <Grid container spacing={2} alignItems="center" justify="space-evenly">
        <Grid item xs={1} style={{ padding: "0 auto" }}>
          <WarningRounded style={{ transform: "scale(2)" }} />
        </Grid>
        <Grid item xs={11}>
          <ul>
            <li>
              <Typography variant="body2">
                {t("patient.report.offline.appRemainsFunctional")}{" "}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                {t("patient.report.offline.pleaseSubmit")}{" "}
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                {t("patient.report.offline.willBeUploaded")}{" "}
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </div>
  );
}
