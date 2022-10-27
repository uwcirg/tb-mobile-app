import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import "react-circular-progressbar/dist/styles.css";
import PhotoAdherence from "./Photo";
import MedicationAdherence from "./Medication";
import Grid from "@material-ui/core/Grid";
import SectionLabel from "../../../Components/SectionLabel";

const useStyles = makeStyles({
  container: {
    padding: "1em",
    backgroundColor: "white",
    "& > h2": {
      overflow: "wrap",
    },
  },
  body: {
    "& > div": {
      marginTop: "1em",
    },
  },
});

const AdherenceSummary = () => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <SectionLabel>
        {t("coordinator.patientTableLabels.adherence")}
      </SectionLabel>
      <Grid className={classes.body} container direction="column">
        <MedicationAdherence />
        <PhotoAdherence />
      </Grid>
    </div>
  );
};

export default AdherenceSummary;
