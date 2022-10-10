import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import ForumIcon from "@material-ui/icons/Forum";

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

const Welcome = () => {
  const { t, i18n } = useTranslation("translation");
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <h2>
          {t("patient.walkthrough.messaging.header")} <ForumIcon />{" "}
        </h2>
        <p>{t("patient.walkthrough.messaging.text")}</p>
      </div>
    </>
  );
};

export default Welcome;
