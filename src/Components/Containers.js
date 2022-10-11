import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  autoFlexRow: {
    width: "100%",
  },
});

const AutoWidth = (props) => {
  const classes = useStyles();

  return (
    <Grid
      {...props}
      className={`${classes.autoFlexRow} ${props.className}`}
      container
    />
  );
};

export { AutoWidth };
