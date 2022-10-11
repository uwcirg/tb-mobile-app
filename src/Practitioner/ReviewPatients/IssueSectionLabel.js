import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import ListSectionLabel from "./ListSectionLabel";

const IssueSectionLabel = ({ isIssues }) => {
  const { t } = useTranslation("translation");
  return (
    <Grid container alignItems="center">
      <ListSectionLabel>
        {isIssues ? t("reviewIssues.hasIssues") : t("reviewIssues.onTrack")}
      </ListSectionLabel>
    </Grid>
  );
};

export default IssueSectionLabel;
