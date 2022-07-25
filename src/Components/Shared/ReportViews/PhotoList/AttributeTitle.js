import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Colors from "../../../../Basics/Colors";

const useStyles = makeStyles({
  root: {
    textTransform: "capitalize",
    fontWeight: "500",
    color: Colors.textDarkGray,
    marginBottom: ".5rem"
  },
});

export default function AttributeTitle({ children }) {
  const classes = useStyles();

  return (
    <Typography className={classes.root} variant="body2">
      {children}
    </Typography>
  );
}
