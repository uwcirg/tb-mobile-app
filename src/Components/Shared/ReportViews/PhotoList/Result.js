import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CheckCircle, HighlightOff, RemoveCircle } from "@material-ui/icons";
import Colors from "../../../../Basics/Colors";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  icon: {
    color: (props) => props.color || "none",
  },
  text: {
    marginLeft: "4px",
    textTransform: "capitalize",
  },
});

const getDisplay = (result, t) => {
  switch (result) {
    case null:
      return {
        text: t("report.pending"),
        icon: RemoveCircle,
        color: Colors.yellow,
      };
    case true:
      return {
        text: t("photoReportReview.detected"),
        icon: CheckCircle,
        color: Colors.green,
      };
    default:
      return {
        text: t("redoPhoto.notDetected"),
        icon: HighlightOff,
        color: Colors.red,
      };
  }
};

export default function Result({ result }) {
  const { t } = useTranslation("translation");
  const { text, color, icon } = getDisplay(result, t);
  const classes = useStyles({ color: color });
  return (
    <Grid container alignItems="center">
      {React.createElement(icon, { className: classes.icon })}
      <Typography className={classes.text} variant="body1">
        {text}
      </Typography>
    </Grid>
  );
}
