import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Colors from "../Basics/Colors";

const useStyles = makeStyles({
  container: {
    margin: "auto",
    color: Colors.textDarkGray,
    "& > svg": {
      margin: "auto",
    },
  },
  text: {
    textAlign: "center",
  },
});

const Loading = () => {
  const classes = useStyles();
  const { t } = useTranslation("translation");

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classes.container}
    >
      <p className={classes.text}>{t("commonWords.loading")}...</p>
      <CircularProgress variant="indeterminate" />
    </Grid>
  );
};

export default Loading;
