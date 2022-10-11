import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CalIcon from "@material-ui/icons/EventAvailable";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    "& > h2": {
      textAlign: "center",
      textTransform: "capitalize",
    },
    "& > ol > li": {
      margin: ".5em 0 0 0",
    },
  },
});

const Progress = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation("translation");

  return (
    <div className={classes.container}>
      <h2>
        {" "}
        {t("patient.walkthrough.progress.header")} <CalIcon />{" "}
      </h2>
      <p> {t("patient.walkthrough.progress.here")}:</p>
      <ol>
        <li>{t("patient.walkthrough.progress.one")} </li>
        <li>{t("patient.walkthrough.progress.three")}</li>
      </ol>
    </div>
  );
};

export default Progress;
