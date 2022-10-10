import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import Colors from "../Basics/Colors";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  error: {
    backgroundColor: Colors.calendarRed,
    padding: ".5em",
    borderRadius: "5px",
  },
});

const GenericErrorMessage = () => {
  const { t } = useTranslation("translation");
  const classes = useStyles();

  return (
    <Typography className={classes.error} variant="body1">
      {t("commonWords.errorMessage")}
    </Typography>
  );
};
export default GenericErrorMessage;
