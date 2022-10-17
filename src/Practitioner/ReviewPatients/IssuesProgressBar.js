import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LinearProgress, Typography, Box } from "@material-ui/core";
import Colors from "../../Basics/Colors";
import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";

export default function IssuesProgressBar({ patients }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const patientsReviewed = patients.filter(
    ({ lastGeneralResolution, unresolvedReports }) => {
      return (
        DateTime.local().toISODate() ===
          DateTime.fromISO(lastGeneralResolution).toISODate() &&
        unresolvedReports.length === 0
      );
    }
  ).length;

  // how can we stop re-rendering this component?
  // It's re-rendering every time, regardless if the patient list is updated
  // or not.

  return (
    <div className={classes.progress}>
      <Typography variant="subtitle1" className={classes.title}>
        <span style={{ fontWeight: "bold" }}>
          {patientsReviewed} / {patients.length}
        </span>{" "}
        {t("reviewIssues.reviewed")}
      </Typography>
      <BorderLinearProgress
        variant="determinate"
        value={(patientsReviewed / patients.length) * 100}
      />
      <Box></Box>
    </div>
  );
}

const useStyles = makeStyles({
  progress: {
    padding: "1em",
    width: "90%",
    margin: "0 auto",
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    margin: "auto",
    height: 13,
    borderRadius: 9,
  },
  colorPrimary: {
    backgroundColor: Colors.lightgray,
  },
  bar: {
    borderRadius: 9,
    backgroundColor: Colors.accentBlue,
  },
}))(LinearProgress);
