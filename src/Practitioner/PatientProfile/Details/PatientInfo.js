import React from "react";
import SectionLabel from "../../../Components/SectionLabel";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { DateTime } from "luxon";
import Styles from "../../../Basics/Styles";
import ProgressVis from "./ProgressVis";
import Item from "./Item";
import { Box, Grid, Typography } from "@material-ui/core";
import Priority from "../../Shared/Priority";
import Label from "../../../Components/Label";
import Colors from "../../../Basics/Colors";

const PatientInfo = observer(({ patient }) => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  const getDate = (iso) => {
    return DateTime.fromISO(iso).toLocaleString({
      day: "numeric",
      month: "short",
    });
  };
  const { lastReport, weeksInTreatment, priority } = patient;

  const daysAgo = !!lastReport
    ? Math.round(DateTime.fromISO(lastReport.createdAt).diffNow("days").days) *
      -1
    : t("coordinator.tasksSidebar.noneYet");

  const survey = patient.contactTracingSurvey;

  const householdTestingText = survey ? (
    <>
      {`${survey.numberOfContactsTested} / ${survey.numberOfContacts} 
        ${t("householdTesting.membersTested")} - ${t(
        "householdTesting.updated"
      )} ${getDate(survey.createdAt)}`}
    </>
  ) : (
    t("householdTesting.noResponse")
  );

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <SectionLabel className={classes.fullWidth}>
          {t("coordinator.patientProfile.details.progress")}
        </SectionLabel>
        <ProgressVis />
        <SectionLabel className={classes.fullWidth}>
          {t("coordinator.patientTableLabels.details")}
        </SectionLabel>
        <Grid wrap="nowrap" container>
          <Typography>{t("coordinator.patientProfile.lastReport")}:</Typography>
          <Box flexGrow={1} />
          <Box width={"8px"} />
          <Typography>
            {typeof daysAgo !== "string"
              ? daysAgo === 0
                ? t("patient.home.today")
                : `${daysAgo} ${t("time.day_ago", { count: daysAgo })}`
              : daysAgo}
          </Typography>
        </Grid>
        <Box height={"5px"} />
        <Grid container>
          <Typography>
            {t("coordinator.patientTableLabels.priority")}:
          </Typography>
          <Box width={"8px"} />
          <Box flexGrow={1} />
          <Priority index={priority} />
        </Grid>
        <Box height={"5px"} />
        <Grid container>
          <Typography>{t("mobileUpdate.treatment")}:</Typography>
          <Box width={"8px"} />
          <Box flexGrow={1} />
          <Label
            text={`${t("educationalMessages.week")} ${weeksInTreatment} / 26`}
            backgroundColor={Colors.accentBlue}
          />
        </Grid>
        {/* <Item
          top={t("coordinator.patientProfile.lastContacted")}
          bottom={getDate(patient.lastContacted)}
        />
        <Item
          className={classes.capitalize}
          top={t("householdTesting.title")}
          bottom={householdTestingText}
        /> */}
      </div>
    </div>
  );
});

const useStyles = makeStyles({
  container: {
    ...Styles.flexRow,
    backgroundColor: "white",
    padding: "1em",
  },
  detailGroup: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "true",
    width: "100%",
    "& > div": {
      marginRight: "2em",
    },
    marginBottom: "1em",
  },
  details: {
    flex: "1 1 0",
  },
  fullWidth: {
    width: "100%",
    marginBottom: "1em",
  },
  capitalize: {
    "& > *": {
      textTransform: "capitalize",
    },
  },
});

export default PatientInfo;
