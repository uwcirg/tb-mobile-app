import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Colors from "../../Basics/Colors";

const useStyles = makeStyles({
  details: {
    width: "100%",
    justifyContent: "flex-start",
    flexGrow: 1,
    "& > *": {
      paddingLeft: ".5em",
      display: "flex",
      flex: "1 1 0",
      borderRight: `solid 1px ${Colors.lightgray}`,
    },
    "& > :last-child, & > :first-child": {
      width: "65px",
    },
    "& > :last-child": {
      borderRight: "none",
    },
    "& > :first-child": {
      padding: "0 1em",
    },
  },
});

const CompName = ({ children, className }) => {
  const classes = useStyles();

  return (
    <Grid wrap="nowrap" className={`${classes.details} ${className}`} container>
      {children}
    </Grid>
  );
};

export default CompName;
